// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Profile {
    struct UserProfile {
        address userAddress;
        string displayName;
        string bio;
    }
    
    mapping(address => UserProfile) public profiles;

    function setProfile(string memory _displayName, string memory _bio) public {
        require(msg.sender!=profiles[msg.sender].userAddress,"There already exist a user with this account");
    profiles[msg.sender]=UserProfile(msg.sender,_displayName,_bio);
    }

    function getProfile(address _user) public view returns (UserProfile memory) {
        return profiles[_user];
    }
    function changeBio(string memory _newBio) external{
       profiles[msg.sender].bio=_newBio;
    }

}