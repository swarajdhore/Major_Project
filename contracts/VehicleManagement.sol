// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleManagement {
    address public owner;
    uint256 public numVehicles;
    mapping(uint256 => Vehicle) public vehicles;
    mapping(address => mapping(uint256 => uint256[])) public ownerToVehicles;

    struct Vehicle {
        string make;
        string model;
        uint256 year;
        address owner;
        bool isRegistered;
        uint256[] ownerHistory;
    }

    event VehicleRegistered(
        uint256 vehicleId,
        string make,
        string model,
        uint256 year,
        address owner
    );
    event VehicleTransferred(
        uint256 vehicleId,
        address previousOwner,
        address newOwner
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function registerVehicle(
        string memory _make,
        string memory _model,
        uint256 _year
    ) public {
        require(bytes(_make).length > 0, "Make is required");
        require(bytes(_model).length > 0, "Model is required");
        require(_year > 0, "Year is required");
        numVehicles++;
        vehicles[numVehicles] = Vehicle(
            _make,
            _model,
            _year,
            msg.sender,
            true,
            new uint256[](0)
        );
        vehicles[numVehicles].ownerHistory.push(block.timestamp);
        ownerToVehicles[msg.sender][numVehicles].push(block.timestamp);
        emit VehicleRegistered(numVehicles, _make, _model, _year, msg.sender);
    }

    function transferVehicle(uint256 _vehicleId, address _newOwner) public {
        require(
            _vehicleId > 0 && _vehicleId <= numVehicles,
            "Invalid vehicle ID"
        );
        Vehicle storage vehicle = vehicles[_vehicleId];
        require(vehicle.isRegistered, "Vehicle is not registered");
        require(
            msg.sender == vehicle.owner,
            "Only the current owner can transfer the vehicle"
        );
        require(_newOwner != address(0), "New owner is required");
        vehicle.owner = _newOwner;
        vehicle.ownerHistory.push(block.timestamp);
        ownerToVehicles[_newOwner][_vehicleId].push(block.timestamp);
        emit VehicleTransferred(_vehicleId, msg.sender, _newOwner);
    }

    function getVehicle(uint256 _vehicleId)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            address,
            bool,
            uint256[] memory
        )
    {
        require(
            _vehicleId > 0 && _vehicleId <= numVehicles,
            "Invalid vehicle ID"
        );
        Vehicle memory vehicle = vehicles[_vehicleId];
        return (
            vehicle.make,
            vehicle.model,
            vehicle.year,
            vehicle.owner,
            vehicle.isRegistered,
            vehicle.ownerHistory
        );
    }

    function getVehicleHistory(uint256 _vehicleId)
        public
        view
        returns (uint256[] memory)
    {
        require(
            _vehicleId > 0 && _vehicleId <= numVehicles,
            "Invalid vehicle ID"
        );
        Vehicle memory vehicle = vehicles[_vehicleId];
        return vehicle.ownerHistory;
    }

    function getOwnerVehicles(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        return ownerToVehicles[_owner][numVehicles];
    }
}
