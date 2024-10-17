// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VaccineToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VaccineDAOHealthRecords is Ownable {
    struct Person {
        string firstName;
        string lastName;
        string locationAddress;
        string role;
        string city;
        string country;
        string postalCode;
        string licenceNumber;
        address walletAddress;
        address doctorWalletAddress;
        bool vaccinated;
    }
    struct Vaccine {
        address patientAddress;
        string companyName;
        uint256 date;
    }
    VaccineToken public vaccineToken;
    address[] private patientAddresses;
    address[] private doctorAddresses;
    mapping(address => bool) public canChange;
    mapping(address => Person) public patients;
    mapping(address => Person) public doctors;
    mapping(address => Vaccine[]) public patientVaccine;
    mapping(address => Vaccine[]) public doctorVaccine;
    uint256 public rewardAmount = 20 * 10 ** 18;
    event PersonAdded(address indexed walletAddress, string firstName, string lastName, string locationAddress, string role, string city, string country, string postalCode, string licenceNumber);
    event Vaccinated(address indexed patientWalletAddress, uint256 date, string companyName);

    constructor(address _rewardTokenAddress) Ownable(msg.sender) {
        vaccineToken = VaccineToken(_rewardTokenAddress);
    }

    function addHealthRecord(
        string memory _firstName,
        string memory _lastName,
        string memory _locationAddress,
        string memory _role,
        string memory _city,
        string memory _country,
        string memory _postalCode,
        string memory _licenceNumber
    ) external {
        address userAddress = msg.sender;
        bytes32 roleHash = keccak256(bytes(_role));
        bool matchDoctor = roleHash == keccak256(bytes("doctor"));
        address _doctorsAddress = address(0);
        bool _vaccinated = false;
        if (matchDoctor) {
            if (doctors[userAddress].walletAddress == address(0)) {
                // New patient, add to the array
                doctorAddresses.push(userAddress);
            }
            doctors[userAddress] = Person(_firstName, _lastName, _locationAddress, _role, _city, _country, _postalCode, _licenceNumber, userAddress, _doctorsAddress, _vaccinated);
        } else {
            if (patients[userAddress].walletAddress == address(0)) {
                // New patient, add to the array
                patientAddresses.push(userAddress);
            } else {
                _doctorsAddress = patients[userAddress].doctorWalletAddress;
                _vaccinated = patients[userAddress].vaccinated;
            }

            patients[userAddress] = Person(_firstName, _lastName, _locationAddress, _role, _city, _country, _postalCode, _licenceNumber, userAddress, _doctorsAddress, _vaccinated);
        }

        emit PersonAdded(userAddress, _firstName, _lastName, _locationAddress, _role, _city, _country, _postalCode, _licenceNumber);
    }

    function assignDoctor(
        address _doctorWalletAddress
    ) external {
        require(patients[msg.sender].walletAddress != address(0), "No patient found.");
        require(doctors[_doctorWalletAddress].walletAddress != address(0), "No doctor found.");
        
        patients[msg.sender].doctorWalletAddress = _doctorWalletAddress;
    }

    function updateVaccinatedStatus(
        address _patientWalletAddress,
        string memory _companyName
    ) external {
         // Cache the patient's struct in memory
        Person storage patient = patients[_patientWalletAddress];

        require(patient.walletAddress != address(0), "No patient found.");
        require(patient.doctorWalletAddress == msg.sender, "Only the authorised doctor can update the vaccination status");

        // Perform updates
        patient.vaccinated = true;
        patientVaccine[_patientWalletAddress].push(Vaccine(_patientWalletAddress, _companyName, block.timestamp));
        doctorVaccine[msg.sender].push(Vaccine(_patientWalletAddress, _companyName, block.timestamp));

        vaccineToken.mint(msg.sender, rewardAmount);
        vaccineToken.mint(_patientWalletAddress, rewardAmount);

        emit Vaccinated(_patientWalletAddress, block.timestamp, _companyName);
    }

    function getInformation(address _walletAddress, string memory _role) external view returns (Person memory) {
        if (keccak256(bytes(_role)) == keccak256(bytes("doctor"))) {
            return doctors[_walletAddress];
        } else {
            return patients[_walletAddress];
        }
    }

    function getEverything(string memory _role) external view returns (Person[] memory) {
        if (keccak256(bytes(_role)) == keccak256(bytes("doctor"))) {
            Person[] memory allUsers = new Person[](doctorAddresses.length);
            for (uint i = 0; i < doctorAddresses.length; i++) {
                allUsers[i] = doctors[doctorAddresses[i]];
            }

            return allUsers;
        } else {
            Person[] memory allUsers = new Person[](patientAddresses.length);
            for (uint i = 0; i < patientAddresses.length; i++) {
                allUsers[i] = patients[patientAddresses[i]];
            }

            return allUsers;
        }
    }

    function vaccineHistory(address _walletAddress, string memory _role) external view returns (Vaccine[] memory) {
        if (keccak256(bytes(_role)) == keccak256(bytes("doctor"))) {
            require(doctors[_walletAddress].walletAddress != address(0), "No doctor found.");
            return doctorVaccine[_walletAddress];
        } else {
            require(patients[_walletAddress].walletAddress != address(0), "No patient found.");
            return patientVaccine[_walletAddress];
        }
    }

    function isVaccinated(address _patientWalletAddress) external view returns (bool) {
        require(patients[_patientWalletAddress].walletAddress != address(0), "No patient found.");
        return patients[_patientWalletAddress].vaccinated;
    }

    function isPatient(address _patientWalletAddress) external view returns (bool) {
        if (patients[_patientWalletAddress].walletAddress != address(0)) {
            return true;
        }

        return false;
    }

    function isDoctor(address _doctorWalletAddress) external view returns (bool) {
        if (doctors[_doctorWalletAddress].walletAddress != address(0)) {
            return true;
        }

        return false;
    }

    // function searchDoctorsByString(
    //     string memory _searchTerm
    // ) external view returns (Person[] memory) {
    //     uint count = 0;
        
    //     // First, count how many matches there are
    //     for (uint i = 0; i < doctorAddresses.length; i++) {
    //         if (keccak256(abi.encodePacked(doctors[doctorAddresses[i]].postalCode)) == keccak256(abi.encodePacked(_searchTerm)) ||
    //             keccak256(abi.encodePacked(doctors[doctorAddresses[i]].city)) == keccak256(abi.encodePacked(_searchTerm)) ||
    //             keccak256(abi.encodePacked(doctors[doctorAddresses[i]].country)) == keccak256(abi.encodePacked(_searchTerm))) {
    //             count++;
    //         }
    //     }

    //     // Now, create an array of the correct size and populate it
    //     Person[] memory matchingDoctors = new Person[](count);
    //     uint index = 0;
    //     for (uint i = 0; i < doctorAddresses.length; i++) {
    //         if (keccak256(abi.encodePacked(doctors[doctorAddresses[i]].postalCode)) == keccak256(abi.encodePacked(_searchTerm)) ||
    //             keccak256(abi.encodePacked(doctors[doctorAddresses[i]].city)) == keccak256(abi.encodePacked(_searchTerm)) ||
    //             keccak256(abi.encodePacked(doctors[doctorAddresses[i]].country)) == keccak256(abi.encodePacked(_searchTerm))) {
    //             matchingDoctors[index] = doctors[doctorAddresses[i]];
    //             index++;
    //         }
    //     }

    //     return matchingDoctors;
    // }

    function changeVaccineToken(address _rewardTokenAddress) external onlyOwner {
        vaccineToken = VaccineToken(_rewardTokenAddress);
    }
    
    function changeRewardPermission(address _walletAddress, bool _action) external onlyOwner {
        canChange[_walletAddress] = _action;
    }

    function changeRewards(uint256 _rewards) external {
        require(canChange[msg.sender], "Not authorized");
        rewardAmount = _rewards * 10 ** 18;
        canChange[msg.sender] = false;
    }
}