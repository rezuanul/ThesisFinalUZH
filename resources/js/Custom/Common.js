let functions = {
    alertPopup(obj) {
        let icon = 'warning'

        if (obj.type) {
            icon = obj.type
        }

        if (obj.iconHtml) {
            icon = null
        }

        if (obj.noIcon) {
            icon = null
        }

        return swal.fire({
            title: obj.title,
            text: obj.text,
            toast: obj.toast ? obj.toast : false,
            position: obj.position ? obj.position : 'center',
            html: obj.html ? obj.html : false,
            customClass: obj.customClass ? obj.customClass : '',
            icon: icon,
            iconHtml: obj.iconHtml ? obj.iconHtml : null,
            timer: obj.timer ? obj.timer : false,
            timerProgressBar: obj.timerProgress ? obj.timerProgress : false,
            preConfirm: obj.preConfirm ? obj.preConfirm : false,
            showCancelButton: (obj.showCancel || obj.showCancel === false) ? obj.showCancel : true,
            showConfirmButton: (obj.showConfirm || obj.showConfirm === false) ? obj.showConfirm : true,
            confirmButtonText: obj.confirmButton,
            cancelButtonText: obj.confirmCancel,
            allowEnterKey: false,
            reverseButtons: (obj.reverseButton || obj.reverseButton == false) ? obj.reverseButton : true
        })
    },
    async inputPopup(obj) {
        return await swal.fire({
            html: obj.html ? obj.html : false,
            confirmButtonText: obj.confirmButton,
            cancelButtonText: obj.confirmCancel,
            customClass: obj.customClass ? obj.customClass : '',
            input: obj.input ? obj.input : null,
            inputLabel: obj.label,
            inputPlaceholder: obj.placeholder,
            showCancelButton: true,
            inputOptions: obj.inputOptions,
            inputValidator: (value) => {
                if (!value) {
                    return 'This field is required.'
                }
            }
        })
    },
    async customPopup(obj) {
        return await swal.fire({
            title: "Please enter the name of the company that produces the vaccine you are administering to the patient.",
            html: obj.html ? obj.html : null,
            focusConfirm: false,
            confirmButtonText: obj.confirmButton,
            didRender: () => {
                const dropdown = document.getElementById('swal-input1');

                dropdown.addEventListener('change', function() {
                    const selectedValue = dropdown.value;
                    if (selectedValue == 'Other') {
                        document.getElementById("swal-input2").classList.remove('hidden')
                    } else {
                        document.getElementById("swal-input2").classList.add('hidden')
                    }
                });
                //document.getElementById("swal-input1").onchange = function(){alert(3434)}
            },
            inputValidator: (value) => {
                console.log(value)
                if (!value) {
                    return "You need to choose something!";
                }
            },
            preConfirm: () => {
                if (!document.getElementById("swal-input1").value) {
                    document.getElementById("swal-input1").classList.add('error-border')
                    return false
                } else {
                    document.getElementById("swal-input1").classList.remove('error-border')
                }

                if (document.getElementById("swal-input1").value == 'Other' && !document.getElementById("swal-input2").value) {
                    document.getElementById("swal-input2").classList.add('error-border')
                    return false
                } else {
                    document.getElementById("swal-input2").classList.remove('error-border')
                }

                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value
                ];
            },
          });
    },
    alertPopupClose() {
        swal.close();
    },
    erc20ABI () {
        return [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "initialOwner",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "allowance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "needed",
                        "type": "uint256"
                    }
                ],
                "name": "ERC20InsufficientAllowance",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "needed",
                        "type": "uint256"
                    }
                ],
                "name": "ERC20InsufficientBalance",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "approver",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidApprover",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidReceiver",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidSender",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidSpender",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "OwnableInvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "OwnableUnauthorizedAccount",
                "type": "error"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_minter",
                        "type": "address"
                    }
                ],
                "name": "addMinter",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "mint",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "minters",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_minter",
                        "type": "address"
                    }
                ],
                "name": "removeMinter",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    },
    records() {
        return [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_rewardTokenAddress",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "OwnableInvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "OwnableUnauthorizedAccount",
                "type": "error"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "firstName",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "lastName",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "locationAddress",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "role",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "city",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "country",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "postalCode",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "licenceNumber",
                        "type": "string"
                    }
                ],
                "name": "PersonAdded",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "patientWalletAddress",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "companyName",
                        "type": "string"
                    }
                ],
                "name": "Vaccinated",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_firstName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_lastName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_locationAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_role",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_city",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_country",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_postalCode",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_licenceNumber",
                        "type": "string"
                    }
                ],
                "name": "addHealthRecord",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_doctorWalletAddress",
                        "type": "address"
                    }
                ],
                "name": "assignDoctor",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "canChange",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "_action",
                        "type": "bool"
                    }
                ],
                "name": "changeRewardPermission",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_rewards",
                        "type": "uint256"
                    }
                ],
                "name": "changeRewards",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_rewardTokenAddress",
                        "type": "address"
                    }
                ],
                "name": "changeVaccineToken",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "doctorVaccine",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "patientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "companyName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "date",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "doctors",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "firstName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "lastName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "locationAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "role",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "city",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "country",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "postalCode",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "licenceNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "doctorWalletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "vaccinated",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_role",
                        "type": "string"
                    }
                ],
                "name": "getEverything",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "firstName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "lastName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "locationAddress",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "role",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "city",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "country",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "postalCode",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "licenceNumber",
                                "type": "string"
                            },
                            {
                                "internalType": "address",
                                "name": "walletAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "doctorWalletAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "bool",
                                "name": "vaccinated",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct VaccineDAOHealthRecords.Person[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_role",
                        "type": "string"
                    }
                ],
                "name": "getInformation",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "firstName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "lastName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "locationAddress",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "role",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "city",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "country",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "postalCode",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "licenceNumber",
                                "type": "string"
                            },
                            {
                                "internalType": "address",
                                "name": "walletAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "doctorWalletAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "bool",
                                "name": "vaccinated",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct VaccineDAOHealthRecords.Person",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_doctorWalletAddress",
                        "type": "address"
                    }
                ],
                "name": "isDoctor",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_patientWalletAddress",
                        "type": "address"
                    }
                ],
                "name": "isPatient",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_patientWalletAddress",
                        "type": "address"
                    }
                ],
                "name": "isVaccinated",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "patientVaccine",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "patientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "companyName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "date",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "patients",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "firstName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "lastName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "locationAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "role",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "city",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "country",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "postalCode",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "licenceNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "doctorWalletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "vaccinated",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "rewardAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_patientWalletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_companyName",
                        "type": "string"
                    }
                ],
                "name": "updateVaccinatedStatus",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_role",
                        "type": "string"
                    }
                ],
                "name": "vaccineHistory",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "patientAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "companyName",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "date",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct VaccineDAOHealthRecords.Vaccine[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "vaccineToken",
                "outputs": [
                    {
                        "internalType": "contract VaccineToken",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    },
    proposalABI() {
        return [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_userInfoAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_rewardTokenAddress",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "OwnableInvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "OwnableUnauthorizedAccount",
                "type": "error"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "bytes32",
                        "name": "proposalId",
                        "type": "bytes32"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "proposer",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "proposalType",
                        "type": "string"
                    }
                ],
                "name": "ProposalCreated",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "bytes32",
                        "name": "proposalId",
                        "type": "bytes32"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "voter",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "optionId",
                        "type": "uint256"
                    }
                ],
                "name": "VoteCasted",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "allProposalIds",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "canChange",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "canVote",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "_action",
                        "type": "bool"
                    }
                ],
                "name": "changeRewardPermission",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_rewards",
                        "type": "uint256"
                    }
                ],
                "name": "changeRewards",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_userInfoAddress",
                        "type": "address"
                    }
                ],
                "name": "changeVaccineDAOHealthRecords",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_rewardTokenAddress",
                        "type": "address"
                    }
                ],
                "name": "changeVaccineToken",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "_action",
                        "type": "bool"
                    }
                ],
                "name": "changeVotePermission",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_title",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_options",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_healthConditions",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string",
                        "name": "_proposalType",
                        "type": "string"
                    }
                ],
                "name": "createProposal",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAllProposals",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "bytes32",
                                "name": "proposalId",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "address",
                                "name": "proposer",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "expiry",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "executed",
                                "type": "bool"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "optionName",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "votes",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct Proposal.VoteOption[]",
                                "name": "options",
                                "type": "tuple[]"
                            },
                            {
                                "internalType": "string",
                                "name": "proposalType",
                                "type": "string"
                            },
                            {
                                "internalType": "string[]",
                                "name": "healthConditions",
                                "type": "string[]"
                            }
                        ],
                        "internalType": "struct Proposal.ProposalStruct[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "_proposalId",
                        "type": "bytes32"
                    }
                ],
                "name": "getProposalDetails",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "proposer",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "executed",
                        "type": "bool"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "optionName",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "votes",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Proposal.VoteOption[]",
                        "name": "options",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "healthConditions",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string",
                        "name": "proposalType",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "_proposalId",
                        "type": "bytes32"
                    }
                ],
                "name": "getProposalResults",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "optionName",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "votes",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Proposal.VoteOption[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_proposer",
                        "type": "address"
                    }
                ],
                "name": "getProposalsByProposer",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "bytes32",
                                "name": "proposalId",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "address",
                                "name": "proposer",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "expiry",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "executed",
                                "type": "bool"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "optionName",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "votes",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct Proposal.VoteOption[]",
                                "name": "options",
                                "type": "tuple[]"
                            },
                            {
                                "internalType": "string",
                                "name": "proposalType",
                                "type": "string"
                            },
                            {
                                "internalType": "string[]",
                                "name": "healthConditions",
                                "type": "string[]"
                            }
                        ],
                        "internalType": "struct Proposal.ProposalStruct[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_type",
                        "type": "string"
                    }
                ],
                "name": "getProposalsByType",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "bytes32",
                                "name": "proposalId",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "address",
                                "name": "proposer",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "title",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "expiry",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "executed",
                                "type": "bool"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "optionName",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "votes",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct Proposal.VoteOption[]",
                                "name": "options",
                                "type": "tuple[]"
                            },
                            {
                                "internalType": "string",
                                "name": "proposalType",
                                "type": "string"
                            },
                            {
                                "internalType": "string[]",
                                "name": "healthConditions",
                                "type": "string[]"
                            }
                        ],
                        "internalType": "struct Proposal.ProposalStruct[]",
                        "name": "",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "bool[]",
                        "name": "",
                        "type": "bool[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "proposalCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "proposals",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "proposalId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address",
                        "name": "proposer",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "executed",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "proposalType",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "proposerProposals",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "rewardAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "userInfo",
                "outputs": [
                    {
                        "internalType": "contract VaccineDAOHealthRecords",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "vaccineToken",
                "outputs": [
                    {
                        "internalType": "contract VaccineToken",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "_proposalId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_optionId",
                        "type": "uint256"
                    }
                ],
                "name": "vote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "voted",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    }
}
export default functions;
