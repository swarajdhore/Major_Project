// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleManagement {
    struct Vehicle {
        uint256 id;
        string make;
        string model;
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

    bool autoTransfer = false;
    mapping(uint256 => Vehicle) public vehicles;
    mapping(address => User) public users;
    mapping(address => uint256[]) public vehicleOwned;
    uint256 public totalVehicles;

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}

    function setVehiclePrice(uint256 _id, uint256 _price) public {
        User storage user = users[msg.sender];
        require(_id < totalVehicles, "Invalid vehicle ID");
        Vehicle storage vehicle = vehicles[_id];
        require(
            vehicle.owner == msg.sender,
            "Only the current owner can set the price of the vehicle"
        );
        vehicle.price = _price;
        vehicle.priceSet = true;
    }

    function buyVehicle(uint256 _id) public payable {
        require(_id < totalVehicles, "Invalid vehicle ID");

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
        transferVehicle(_id, msg.sender);
        autoTransfer = false;
        vehicle.priceSet = false;
    }

    function addVehicle(
        string memory _make,
        string memory _model,
        uint256 _year
    ) public {
        User storage user = users[msg.sender];
        Vehicle storage newVehicle = vehicles[totalVehicles];
        newVehicle.id = totalVehicles;
        newVehicle.make = _make;
        newVehicle.model = _model;
        newVehicle.year = _year;
        newVehicle.owner = msg.sender;
        newVehicle.ownerHistoryCount = 1;
        newVehicle.ownerHistory[0][totalVehicles] = msg.sender;
        totalVehicles++;
        user.currentVehicles++;
        vehicleOwned[msg.sender].push(newVehicle.id);
    }

    function transferVehicle(uint256 _id, address _newOwner) public {
        require(_id < totalVehicles, "Invalid vehicle ID");
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

    function getVehicleOwnerHistory(uint256 _id)
        public
        view
        returns (address[] memory)
    {
        require(_id < totalVehicles, "Invalid vehicle ID");
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
