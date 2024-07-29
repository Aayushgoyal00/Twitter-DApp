const Twitter = artifacts.require("Twitter");
const Profile = artifacts.require("Profile");
module.exports = async function(deployer) {
    // await deployer.deploy(Profile)
    const profileInstance = await Profile.deployed();
    const userContractKey = profileInstance.address;
    await deployer.deploy(Twitter, userContractKey);
};