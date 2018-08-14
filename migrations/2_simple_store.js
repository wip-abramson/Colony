/**
 * Created by will on 05/08/18.
 */
var SimpleStore = artifacts.require("./SimpleStore.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStore);
};