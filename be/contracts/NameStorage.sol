// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NameStorage {
    mapping(address => string) private names;
    address[] private users;

    event NameStored(address indexed user, string name);

    function storeName(string memory _name) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        // If this is a new user, add to users array
        if (bytes(names[msg.sender]).length == 0) {
            users.push(msg.sender);
        }
        
        names[msg.sender] = _name;
        emit NameStored(msg.sender, _name);
    }

    function getName(address _user) public view returns (string memory) {
        return names[_user];
    }

    function getMyName() public view returns (string memory) {
        return names[msg.sender];
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    function getUserCount() public view returns (uint) {
        return users.length;
    }
}