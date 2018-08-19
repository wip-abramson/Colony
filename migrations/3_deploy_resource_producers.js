const ResourceProducer = artifacts.require("./ResourceProducer.sol");
const Wood = artifacts.require("./Wood.sol");

module.exports = async function(deployer) {
    console.log(woodResource);
    deployer.deploy(ResourceProducer);
};
