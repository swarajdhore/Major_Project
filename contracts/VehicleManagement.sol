// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleManagement {
    struct Vehicle {
        uint256 id;
        string numberPlate;
        string carName;
        // string model;
        uint256 year;
        address owner;
        mapping(uint256 => mapping(uint256 => address)) ownerHistory;
        uint256 ownerHistoryCount;
        uint256 price;
        bool priceSet;
    }

    struct VehiclesOwned {
        uint256 id;
        string numberPlate;
        address userAddress;
        string carName;
        uint256 year;
        uint256 ownerHistoryCount;
    }

    struct User {
        address userAdd;
        uint256 currentVehicles;
        uint256[] currentVehiclesID;
        uint256 counterTotalVehiclesOwned;
    }

    struct UserDetails {
        string name;
        uint age;
        string email;
        bool exists;
    }

    struct VehicleDetails {
        string carName;
        uint256 year;
        string numberPlate;
        string ownerName;
        uint256 price;
    }

    bool autoTransfer = false;
    mapping(uint256 => Vehicle) public vehicles;
    mapping(address => User) public users;
    mapping(address => UserDetails) public userdetails;
    mapping(address => uint256[]) public vehicleOwned;
    mapping(address => string) userNames;
    uint256 public totalVehicles;
    mapping(uint256 => uint256) public vehiclesWithPriceSet;
    // mapping(uint256 => uint256[]) public vehiclesWithPriceSet;
    // uint256[] public vehiclesWithPriceSet;
    address owner;
    uint public counter = 0;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can perform this action"
        );
        _;
    }
    modifier onlyBy(address _account) {
        require(msg.sender == _account, "Sender not authorized.");
        _;
    }
    address rto;

    constructor() {
        addVehicle(
            "MH04AA0001",
            "Maruti Swift Dzire VDI",
            2014,
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        );
        addVehicle(
            "MH14AB0001",
            "Skoda Rapid 1.5 TDI Ambition",
            2014,
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        );
        addVehicle(
            "MH31AC0002",
            "Honda City 2017-2020 EXi",
            2006,
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );
        addVehicle(
            "TN04AD0003",
            "Hyundai i20 Sportz Diesel",
            2010,
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );
        addVehicle(
            "TN04AD0003",
            "Hyundai i20 Sportz Diesel",
            2010,
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        );
        addVehicle(
            "KA19AE0004",
            "Maruti Swift VXI BSIII",
            2007,
            0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
        );
        addVehicle(
            "DL07AF0005",
            "Hyundai Xcent 1.2 VTVT E Plus",
            2017,
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        );
        addVehicle(
            "TS10AG0006",
            "Maruti 800 DX BSII",
            2001,
            0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
        );
        addVehicle(
            "MH04AH0007",
            "Toyota Etios VXD",
            2011,
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        );
        addVehicle(
            "MH14AI0008",
            "Ford Figo Diesel Celebration Edition",
            2013,
            0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
        );
        addVehicle(
            "MH31AJ0009",
            "Renault Duster 110PS Diesel RxL",
            2014,
            0x69F22131F86bC5BD7A57a4B701ef7148256f2256
        );
        addVehicle(
            "TN04AK0010",
            "Maruti Zen LX",
            2005,
            0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
        );
        addVehicle(
            "KA19AL0011",
            "Maruti Swift Dzire VDi",
            2009,
            0x69F22131F86bC5BD7A57a4B701ef7148256f2256
        );
        addVehicle(
            " DL07AM0012",
            "Maruti Wagon R LXI Minor",
            2009,
            0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
        );
        addVehicle(
            "TS10AN0013",
            "Mahindra KUV 100 mFALCON G80 K8 5str",
            2016,
            0x69F22131F86bC5BD7A57a4B701ef7148256f2256
        );
        addVehicle(
            "MH04AO0014",
            "Maruti Ertiga SHVS VDI",
            2016,
            0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
        );

        // register("Swaraj",21,"swaraj@xyz.com", 0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        // register("Anish",21,"anish@xyz.com", 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);
        // setVehiclePrice("MH04AA0001",20);
        // setVehiclePrice("MH31AC0002",40);
        rto = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    }

    function displayVehiclesforSale() public view returns (uint[] memory) {
        uint[] memory indices = new uint[](totalVehicles);
        uint count = 0;
        for (uint i = 0; i < totalVehicles; i++) {
            if (vehicles[i].priceSet == true) {
                indices[count] = i;
                count++;
            }
        }
        uint[] memory result = new uint[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = indices[i];
        }
        return result;
    }

    function displayVehiclesOwned(
        address userAddress
    ) public view returns (VehiclesOwned[] memory) {
        // uint256[] memory indices = new uint256[](totalVehicles);
        User storage user = users[userAddress];
        uint256 count = user.currentVehicles;
        uint256 total = user.counterTotalVehiclesOwned;

        VehiclesOwned[] memory result = new VehiclesOwned[](count);
        uint256 counting = 0;

        for (uint i = 0; i < total; i++) {
            uint256 id = user.currentVehiclesID[i];
            // address[] memory list = getVehicleOwnerHistory(vehicles[id].numberPlate);
            if (vehicles[id].owner == userAddress) {
                result[counting++] = VehiclesOwned(
                    vehicles[id].id,
                    vehicles[id].numberPlate,
                    userAddress,
                    vehicles[id].carName,
                    vehicles[id].year,
                    vehicles[id].ownerHistoryCount
                );
            }
        }
        return result;
    }

    //     function displayVehiclesOwned(address userAddress) public view returns (Vehicle[] memory) {
    //     User storage user = users[userAddress];
    //     uint256 count = user.currentVehicles;
    //     Vehicle[] memory result = new Vehicle[](count);
    //     for (uint256 i = 0; i < count; i++) {
    //         uint256 id = user.currentVehiclesID[i];
    //         result[i] = vehicles[id];
    //     }
    //     return result;
    // }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}

    function setVehiclePrice(
        string memory _numberPlate,
        uint256 _price
    ) public {
        require(userdetails[msg.sender].exists, "User does not exist");
        User storage user = users[msg.sender];
        uint256 _id = totalVehicles;
        for (uint256 i = 0; i < totalVehicles; i++) {
            if (
                keccak256(bytes(vehicles[i].numberPlate)) ==
                keccak256(bytes(_numberPlate))
            ) {
                _id = i;
                break;
            }
        }
        require(_id < totalVehicles, "Invalid Number plate");
        Vehicle storage vehicle = vehicles[_id];
        require(
            vehicle.owner == msg.sender,
            "Only the current owner can set the price of the vehicle"
        );
        vehicle.price = _price;
        vehicle.priceSet = true;
        vehiclesWithPriceSet[counter] = _id;
        counter = counter + 1;
        if (!vehicle.priceSet && _price > 0) {
            vehicle.price = _price;
            vehicle.priceSet = true;
        }
    }

    function register(
        string memory name,
        uint age,
        string memory email
    ) public {
        require(!userdetails[msg.sender].exists, "User already exists");
        userdetails[msg.sender] = UserDetails(name, age, email, true);
        userNames[msg.sender] = name;
    }

    function getUserDetails(
        address _user
    ) public view returns (string memory, uint, string memory) {
        require(userdetails[_user].exists, "User does not exist");
        return (
            userdetails[_user].name,
            userdetails[_user].age,
            userdetails[_user].email
        );
    }

    //     function removeVehicleFromUser(address _user, uint256 _id) public onlyBy(_user) {

    //     // uint256 index;
    //     // bool found;
    //     // for (uint256 i = 0; i < vehiclesOwned.length; i++) {
    //     //     if (vehiclesOwned[i].id == _id) {
    //     //         index = i;
    //     //         found = true;
    //     //         break;
    //     //     }
    //     // }
    //     // require(found, "Vehicle not found in user's currentVehiclesOwned");
    //     delete v[index];
    //     user.currentVehicles--;
    // }

    function buyVehicle(string memory _numberPlate) public payable {
        require(userdetails[msg.sender].exists, "User does not exist");
        uint256 _id = totalVehicles;
        for (uint256 i = 0; i < totalVehicles; i++) {
            if (
                keccak256(bytes(vehicles[i].numberPlate)) ==
                keccak256(bytes(_numberPlate))
            ) {
                _id = i;
                break;
            }
        }
        require(_id < totalVehicles, "Invalid Number plate");

        Vehicle storage vehicle = vehicles[_id];
        require(vehicle.priceSet == true, "Vehicle not for sale");
        require(vehicle.owner != address(0), "Vehicle does not exist");
        require(
            (msg.value / 1 ether) == vehicle.price,
            "Insufficient funds to buy the vehicle"
        );

        address payable seller = payable(vehicle.owner);
        seller.transfer(msg.value);
        autoTransfer = true;
        User storage user = users[vehicle.owner];
        // removeVehicleFromUser(vehicle.owner,_id);
        delete user.currentVehiclesID[_id];
        user.currentVehicles--;

        transferVehicle(_numberPlate, msg.sender);
        autoTransfer = false;
        vehicle.priceSet = false;
        counter = counter - 1;
    }

    function getVehiclesWithPriceSet()
        public
        view
        returns (VehicleDetails[] memory)
    {
        // uint256 count = 0;
        // for (uint256 i = 0; i < vehiclesWithPriceSet.length; i++) {
        //     if (vehicles[vehiclesWithPriceSet[i]].priceSet) {
        //         count++;
        //     }
        // }
        VehicleDetails[] memory result = new VehicleDetails[](counter);
        uint256 index = 0;
        for (uint256 i = 0; i < counter; i++) {
            // Vehicle memory vehicleDetailsPriceSet = vehiclesWithPriceSet[i];
            // if (vehicleDetailsPriceSet[i].priceSet) {
            result[i] = VehicleDetails(
                vehicles[vehiclesWithPriceSet[i]].carName,
                vehicles[vehiclesWithPriceSet[i]].year,
                vehicles[vehiclesWithPriceSet[i]].numberPlate,
                userNames[vehicles[vehiclesWithPriceSet[i]].owner],
                vehicles[vehiclesWithPriceSet[i]].price
            );

            // }
        }
        return result;
    }

    function addVehicle(
        string memory _numberPlate,
        string memory _carName,
        uint256 _year,
        address _address
    ) public {
        User storage user = users[_address];
        Vehicle storage newVehicle = vehicles[totalVehicles];
        newVehicle.id = totalVehicles;
        newVehicle.numberPlate = _numberPlate;
        newVehicle.carName = _carName;
        // newVehicle.model = _model;
        newVehicle.year = _year;
        newVehicle.owner = _address;
        newVehicle.ownerHistoryCount = 1;
        newVehicle.ownerHistory[0][totalVehicles] = _address;
        totalVehicles++;
        user.currentVehicles++;
        user.counterTotalVehiclesOwned++;
        user.currentVehiclesID.push(newVehicle.id);
        // uint index = user.currentVehicles;
        // user.currentVehiclesOwned[_address][index] = newVehicle;

        vehicleOwned[_address].push(newVehicle.id);
        // Vehicle storage vehicle = vehicles[id];
    }

    function transferVehicle(
        string memory _numberPlate,
        address _newOwner
    ) public {
        uint256 _id = totalVehicles;
        for (uint256 i = 0; i < totalVehicles; i++) {
            if (
                keccak256(bytes(vehicles[i].numberPlate)) ==
                keccak256(bytes(_numberPlate))
            ) {
                _id = i;
                break;
            }
        }
        require(_id < totalVehicles, "Invalid Number plate");
        User storage user = users[msg.sender];
        user.counterTotalVehiclesOwned++;
        Vehicle storage vehicle = vehicles[_id];
        require(
            vehicle.owner == msg.sender || autoTransfer == true,
            "Only the current owner can transfer the vehicle"
        );
        vehicle.ownerHistory[vehicle.ownerHistoryCount][_id] = _newOwner;
        vehicle.ownerHistoryCount++;

        user.currentVehicles++;

        // user.currentVehiclesOwned[_newOwner][index] = vehicle;
        user.currentVehiclesID.push(_id);

        uint256[] storage ownerVehicles = vehicleOwned[msg.sender];
        for (uint256 i = 0; i < ownerVehicles.length; i++) {
            if (ownerVehicles[i] == _id) {
                ownerVehicles[i] = ownerVehicles[ownerVehicles.length - 1];
                ownerVehicles.pop();
                break;
            }
        }

        vehicleOwned[_newOwner].push(_id);
        vehicle.owner = _newOwner;
    }

    function getVehicleOwnerHistory(
        string memory _numberPlate
    ) public view returns (address[] memory) {
        uint256 _id = totalVehicles;
        for (uint256 i = 0; i < totalVehicles; i++) {
            if (
                keccak256(bytes(vehicles[i].numberPlate)) ==
                keccak256(bytes(_numberPlate))
            ) {
                _id = i;
                break;
            }
        }
        require(_id < totalVehicles, "Invalid Number plate");
        Vehicle storage vehicle = vehicles[_id];
        address[] memory ownerHistoryList = new address[](
            vehicle.ownerHistoryCount
        );
        for (uint256 i = 0; i < vehicle.ownerHistoryCount; i++) {
            ownerHistoryList[i] = vehicle.ownerHistory[i][_id];
        }
        return ownerHistoryList;
    }

    mapping(address => mapping(uint256 => string)) private documents;
    mapping(address => mapping(uint256 => bool)) private approvalStatus;

    function addDocument(
        address user,
        uint256 docId,
        string memory docHash
    ) public {
        documents[user][docId] = docHash;
    }

    function verifyDocument(
        address user,
        uint256 docId
    ) public view returns (bool) {
        return (keccak256(bytes(documents[user][docId])) != keccak256(""));
    }

    function approveDocument(address user, uint256 docId) public {
        require(msg.sender == rto, "You should be the contract owner");
        approvalStatus[user][docId] = true;
    }

    function denyDocument(address user, uint256 docId) public {
        require(msg.sender == rto, "You should be the contract owner");
        approvalStatus[user][docId] = false;
    }

    function getDocumentHash(
        address user,
        uint256 docId
    ) public view returns (string memory) {
        return documents[user][docId];
    }

    function getApprovalStatus(
        address user,
        uint256 docId
    ) public view returns (bool) {
        return approvalStatus[user][docId];
    }

    // mapping(bytes32 => bool) public approvedFiles;
    // mapping(bytes32 => bool) public deniedFiles;
    // mapping(bytes32 => address) public fileOwners;
    // mapping(address => mapping(bytes32 => bool)) public userFiles;

    // event FileUploaded(bytes32 indexed fileHash, address indexed owner);
    // event FileApproved(bytes32 indexed fileHash);
    // event FileDenied(bytes32 indexed fileHash);

    // function uploadFile(bytes32 fileHash) public {
    //     require(fileOwners[fileHash] == address(0), "File already uploaded");

    //     fileOwners[fileHash] = msg.sender;
    //     userFiles[msg.sender][fileHash] = true;

    //     emit FileUploaded(fileHash, msg.sender);
    // }

    // function approveFile(bytes32 fileHash) public {
    //     require(fileOwners[fileHash] != address(0), "File does not exist");
    //     require(
    //         msg.sender == fileOwners[fileHash],
    //         "Only file owner can approve"
    //     );
    //     require(!approvedFiles[fileHash], "File already approved");

    //     approvedFiles[fileHash] = true;

    //     emit FileApproved(fileHash);
    // }

    // function denyFile(bytes32 fileHash) external {
    //     require(fileOwners[fileHash] != address(0), "File not found");
    //     require(
    //         msg.sender == fileOwners[fileHash],
    //         "Only file owner can approve or deny"
    //     );
    //     deniedFiles[fileHash] = true;

    //     emit FileDenied(fileHash);
    // }

    // function getApprovedFiles() public view returns (bytes32[] memory) {
    //     bytes32[] memory approvedFileHashes = new bytes32[](
    //         approvedFilesCount()
    //     );
    //     uint256 index = 0;
    //     for (uint256 i = 0; i < getFilesCount(); i++) {
    //         bytes32 fileHash = getFileHashAtIndex(i);
    //         if (approvedFiles[fileHash]) {
    //             approvedFileHashes[index] = fileHash;
    //             index++;
    //         }
    //     }
    //     return approvedFileHashes;
    // }

    // function getDeniedFiles() public view returns (bytes32[] memory) {
    //     bytes32[] memory deniedFileHashes = new bytes32[](deniedFilesCount());
    //     uint256 index = 0;
    //     for (uint256 i = 0; i < getFilesCount(); i++) {
    //         bytes32 fileHash = getFileHashAtIndex(i);
    //         if (deniedFiles[fileHash]) {
    //             deniedFileHashes[index] = fileHash;
    //             index++;
    //         }
    //     }
    //     return deniedFileHashes;
    // }

    // function approvedFilesCount() public view returns (uint256) {
    //     uint256 count = 0;
    //     for (uint256 i = 0; i < getFilesCount(); i++) {
    //         bytes32 fileHash = getFileHashAtIndex(i);
    //         if (approvedFiles[fileHash]) {
    //             count++;
    //         }
    //     }
    //     return count;
    // }

    // function deniedFilesCount() public view returns (uint256) {
    //     uint256 count = 0;
    //     for (uint256 i = 0; i < getFilesCount(); i++) {
    //         bytes32 fileHash = getFileHashAtIndex(i);
    //         if (deniedFiles[fileHash]) {
    //             count++;
    //         }
    //     }
    //     return count;
    // }

    // function getFilesCount() public view returns (uint256) {
    //     uint256 count = 0;
    //     for (uint256 i = 0; i < bytes32ArrayLength(fileOwners); i++) {
    //         count++;
    //     }
    //     return count;
    // }

    // function getFileHashAtIndex(uint256 index) public view returns (bytes32) {
    //     return bytes32ArrayElementAtIndex(fileOwners, index);
    // }

    // function bytes32ArrayElementAtIndex(
    //     mapping(bytes32 => address) storage array,
    //     uint256 index
    // ) internal view returns (bytes32) {
    //     bytes32[] memory keys = new bytes32[](bytes32ArrayLength(array));
    //     uint256 count = 0;
    //     for (uint256 i = 0; i < keys.length; i++) {
    //         bytes32 key = keys[i];
    //         if (array[key] != address(0)) {
    //             if (count == index) {
    //                 return key;
    //             }
    //             count++;
    //         }
    //     }
    //     revert("Invalid index");
    // }

    // function bytes32ArrayLength(
    //     mapping(bytes32 => address) storage array
    // ) internal view returns (uint256) {
    //     uint256 count = 0;
    //     for (uint256 i = 0; ; i++) {
    //         bytes32 key = bytes32(i);
    //         if (array[key] != address(0)) {
    //             count++;
    //         }
    //         if (i >= 2 ** 256 - 1) {
    //             break;
    //         }
    //     }
    //     return count;
    // }
}
