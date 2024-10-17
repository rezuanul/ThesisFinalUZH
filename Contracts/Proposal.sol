// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VaccineDAOHealthRecords.sol";
import "./VaccineToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Proposal is Ownable {
    struct VoteOption {
        string optionName;
        uint256 votes;
    }

    struct ProposalStruct {
        bytes32 proposalId;
        address proposer;
        string title;
        uint256 expiry;
        bool executed;
        VoteOption[] options;
        string proposalType;
        string[] healthConditions; // Array of health conditions for Proposal 2
    }

    VaccineToken public vaccineToken;
    VaccineDAOHealthRecords public userInfo;
    mapping(bytes32 => ProposalStruct) public proposals;
    mapping(address => bytes32[]) public proposerProposals;
    bytes32[] public allProposalIds;
    mapping(address => bool) public canChange;
    mapping(address => bool) public canVote;
    uint256 public proposalCount = 0;
    uint256 public rewardAmount = 10 * 10 ** 18;

    mapping(bytes32 => mapping(address => uint256)) public voted; // Stores voting information separately

    // Events
    event ProposalCreated(bytes32 indexed proposalId, address indexed proposer, string title, uint256 expiry, string proposalType);
    event VoteCasted(bytes32 indexed proposalId, address indexed voter, uint256 optionId);

    constructor(address _userInfoAddress, address _rewardTokenAddress) Ownable(msg.sender) {
        userInfo = VaccineDAOHealthRecords(_userInfoAddress);
        vaccineToken = VaccineToken(_rewardTokenAddress);
    }

    function createProposal(string memory _title, string[] memory _options, uint256 _expiry, string[] memory _healthConditions, string memory _proposalType) external returns (bytes32) {
        require(userInfo.isPatient(msg.sender), "Only patient can create this proposal.");
        require(_options.length >= 2, "Must have at least 2 options");

        // Generate a unique proposal ID using keccak256
        bytes32 proposalId = keccak256(
            abi.encodePacked(
                msg.sender,
                _title,
                proposalCount,
                _proposalType,
                block.timestamp
            )
        );

        ProposalStruct storage proposal = proposals[proposalId];
        proposal.proposalId = proposalId;
        proposal.proposer = msg.sender;
        proposal.title = _title;
        proposal.expiry = _expiry;
        proposal.executed = false;
        proposal.healthConditions = _healthConditions;
        proposal.proposalType = _proposalType;

        for (uint256 i = 0; i < _options.length; i++) {
            proposal.options.push(VoteOption({optionName: _options[i], votes: 0}));
        }

        proposerProposals[msg.sender].push(proposalId);
        allProposalIds.push(proposalId);
        proposalCount++;

        emit ProposalCreated(proposalId, msg.sender, _title, _expiry, _proposalType);

        return proposalId;
    }

    function vote(bytes32 _proposalId, uint256 _optionId) external {
        ProposalStruct storage proposal = proposals[_proposalId];
        require(proposal.proposer != msg.sender, "Cannot vote on own proposal.");
        require(block.timestamp <= proposal.expiry, "Voting period has ended");
        require(voted[_proposalId][msg.sender] == 0, "Already voted");
        require(bytes(proposal.options[_optionId].optionName).length > 0, "No option exists.");

        if (keccak256(bytes(proposal.proposalType)) == keccak256(bytes("Proposal 1"))) {
            require(userInfo.isPatient(msg.sender), "Only patients can vote on Proposal 1");
            require(userInfo.isVaccinated(msg.sender) || canVote[msg.sender], 'Only vaccinated patients can vote on this proposal.');
        } else {
            require(userInfo.isDoctor(msg.sender), "Only doctors can vote on Proposal 2");
        }

        voted[_proposalId][msg.sender] = _optionId + 1;
        proposal.options[_optionId].votes++;

        vaccineToken.mint(msg.sender, rewardAmount);

        emit VoteCasted(_proposalId, msg.sender, _optionId);
    }

    function getProposalResults(bytes32 _proposalId) external view returns (VoteOption[] memory) {
        ProposalStruct storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.expiry, "Proposal not yet expired");
        require(proposal.proposer == msg.sender, "Only the proposer can see results");

        return proposal.options;
    }

    function getProposalDetails(bytes32 _proposalId) external view returns (
        address proposer,
        string memory title,
        uint256 expiry,
        bool executed,
        VoteOption[] memory options,
        string[] memory healthConditions,
        string memory proposalType
    ) {
        ProposalStruct storage proposal = proposals[_proposalId];
        return (proposal.proposer, proposal.title, proposal.expiry, proposal.executed, proposal.options, proposal.healthConditions, proposal.proposalType);
    }

    function getProposalsByProposer(address _proposer) external view returns (ProposalStruct[] memory) {
        bytes32[] storage proposalIds = proposerProposals[_proposer];
        ProposalStruct[] memory details = new ProposalStruct[](proposalIds.length);

        for (uint256 i = 0; i < proposalIds.length; i++) {
            details[i] = proposals[proposalIds[i]];
        }

        return details;
    }

    function getAllProposals() external view returns (ProposalStruct[] memory) {
        ProposalStruct[] memory allProposals = new ProposalStruct[](proposalCount);

        for (uint256 i = 0; i < allProposalIds.length; i++) {
            allProposals[i] = proposals[allProposalIds[i]];
        }

        return allProposals;
    }

    function getProposalsByType(string memory _type) external view returns (ProposalStruct[] memory, bool[] memory, uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < allProposalIds.length; i++) {
            if (keccak256(bytes(proposals[allProposalIds[i]].proposalType)) == keccak256(bytes(_type))) {
                count++;
            }
        }

        ProposalStruct[] memory filteredProposals = new ProposalStruct[](count);
        bool[] memory votedStatus = new bool[](count);
        uint256[] memory votedOption = new uint256[](count);

        uint256 index = 0;
        for (uint256 i = 0; i < allProposalIds.length; i++) {
            if (keccak256(bytes(proposals[allProposalIds[i]].proposalType)) == keccak256(bytes(_type))) {
                filteredProposals[index] = proposals[allProposalIds[i]];
                votedStatus[index] = voted[allProposalIds[i]][msg.sender] > 0;
                votedOption[index] = voted[allProposalIds[i]][msg.sender] > 0 ? voted[allProposalIds[i]][msg.sender] - 1 : 0;
                index++;
            }
        }

        return (filteredProposals, votedStatus, votedOption);
    }

    function changeVotePermission(address _walletAddress, bool _action) external onlyOwner {
        canVote[_walletAddress] = _action;
    }

    function changeRewardPermission(address _walletAddress, bool _action) external onlyOwner {
        canChange[_walletAddress] = _action;
    }

    function changeRewards(uint256 _rewards) external {
        require(canChange[msg.sender], "Not authorized");
        rewardAmount = _rewards * 10 ** 18;
        canChange[msg.sender] = false;
    }

    function changeVaccineDAOHealthRecords(address _userInfoAddress) external onlyOwner {
        userInfo = VaccineDAOHealthRecords(_userInfoAddress);
    }

    function changeVaccineToken(address _rewardTokenAddress) external onlyOwner {
        vaccineToken = VaccineToken(_rewardTokenAddress);
    }
}
