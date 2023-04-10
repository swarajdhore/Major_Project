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
    struct User {
        address userAdd;
        uint256 currentVehicles;
    }

    struct UserDetails {
        string name;
        uint age;
        string email;
        bool exists;
    }

    bool autoTransfer = false;
    mapping(uint256 => Vehicle) public vehicles;
    mapping(address => User) public users;
    mapping(address => UserDetails) public userdetails;
    mapping(address => uint256[]) public vehicleOwned;
    uint256 public totalVehicles;

    modifier onlyBy(address _account) {
        require(msg.sender == _account, "Sender not authorized.");
        _;
    }

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
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        );
        addVehicle(
            "TN04AD0003",
            "Hyundai i20 Sportz Diesel",
            2010,
            0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        );
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}

    function setVehiclePrice(
        string memory _numberPlate,
        uint256 _price
    ) public {
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
    }

    function register(
        string memory name,
        uint age,
        string memory email
    ) public {
        require(!userdetails[msg.sender].exists, "User already exists");
        userdetails[msg.sender] = UserDetails(name, age, email, true);
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

    function buyVehicle(string memory _numberPlate) public payable {
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
        user.currentVehicles--;
        transferVehicle(_numberPlate, msg.sender);
        autoTransfer = false;
        vehicle.priceSet = false;
    }

    function addVehicle(
        string memory _numberPlate,
        string memory _carName,
        // string memory _model,
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
        vehicleOwned[_address].push(newVehicle.id);
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
        Vehicle storage vehicle = vehicles[_id];
        require(
            vehicle.owner == msg.sender || autoTransfer == true,
            "Only the current owner can transfer the vehicle"
        );
        vehicle.ownerHistory[vehicle.ownerHistoryCount][_id] = _newOwner;
        vehicle.ownerHistoryCount++;
        // if (vehicle.ownerHistoryCount == 0) {
        user.currentVehicles++;
        // }

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
}
