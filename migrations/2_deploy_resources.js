const Wood = artifacts.require("./Wood.sol");

module.exports = function(deployer) {
  deployer.deploy(Wood);
};
