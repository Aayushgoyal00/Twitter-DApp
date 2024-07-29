const UserProfile = artifacts.require("Profile");

module.exports = function(deployer) {
    deployer.deploy(UserProfile);
};