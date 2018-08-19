const ResourceProducer = artifacts.require("./ResourceProducer.sol");
const Wood = artifacts.require("./Wood.sol");

module.exports = function(deployer, network, accounts) {
    let quantity = 1000;
    let scalar = web3.toWei(1, 'ether');
    let quantityAsTokens = quantity * scalar;
    let upgradeCosts = [100 * scalar, 400 * scalar, 1000 * scalar];
    let upgradeRewards = [100 * scalar, 200 * scalar, 5000 * scalar];
    let woodResourceInstance;

    return deployer
        .then(function() {
            return Wood.deployed()
        })
        .then(function (woodInstance) {
            woodResourceInstance = woodInstance;
            return deployer.deploy(ResourceProducer, quantityAsTokens, woodResourceInstance.address, upgradeCosts, upgradeRewards);
        })
        .then(function (resourceProducerInstance) {
            return woodResourceInstance.mint(resourceProducerInstance.address, quantityAsTokens);
        })
        .then(function () {
            return woodResourceInstance.mint(accounts[1], 100 * scalar);
        });
};
