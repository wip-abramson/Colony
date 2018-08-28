const Wood = artifacts.require("Wood");
const ResourceProducer = artifacts.require("ResourceProducer");
const Promise = require("bluebird");
const addEvmFunctions = require("./utils/evmFunctions");
const assert = require('chai').assert;

contract('Simple ResourceProducer', async (accounts) => {

    let resourceProducerInstance;
    let resourceInstance;
    let owner = accounts[0];
    let player1 = accounts[1];
    let player2 = accounts[2];
    let tokenScalar =  web3.toWei(1, 'ether');

    before('// add the functions to modify time to web3', async () => {
        addEvmFunctions(web3);
        Promise.promisifyAll(web3.eth, { suffix: "Promise" });
        Promise.promisifyAll(web3.evm, { suffix: "Promise" });
        resourceInstance = await Wood.deployed();
        resourceProducerInstance = await ResourceProducer.deployed();
    });

    it('should be possible to run through a basic scenario', async () => {
        // Valid the initial setup
        let maxLevel = await resourceProducerInstance.maxLevel();
        let upgradeCosts = await getDetailsOfSmartContractArray(maxLevel, resourceProducerInstance.upgadeCosts);
        let levelRates = await getDetailsOfSmartContractArray(maxLevel, resourceProducerInstance.levelRates);
        let currentLevel = 0;

        let expectedPlayerOneInitialResources = web3.toBigNumber(100 * tokenScalar);
        assert.isTrue((await resourceInstance.balanceOf(player1)).cmp(expectedPlayerOneInitialResources) === 0, 'Expected that player one would start with the expected amount of resources');
        let expectedAvailableResources = await resourceProducerInstance.maxSupply();
        assert.isTrue((await resourceInstance.balanceOf(resourceProducerInstance.address)).cmp(expectedAvailableResources) === 0, 'Expected that resource producer would start with the expected amount of resources');

        // Expect that since no resource producer has been captured yet - passing of blocks does not change player one's quantity of resources
        await web3.evm.minePromise();
        await web3.evm.minePromise();
        assert.isTrue((await resourceInstance.balanceOf(player1)).cmp(expectedPlayerOneInitialResources) === 0, 'Expected that player one would start with the expected amount of resources');

        // Expect that it should be possible for player one to claim the resource producer
        await resourceInstance.approve(resourceProducerInstance.address, upgradeCosts[0], {from: player1});
        await resourceProducerInstance.becomeBenefactorOfResource({from: player1});
        // Expect that player one should have no remaining resources immediately after claiming the resource producer
        assert.isTrue((await resourceInstance.balanceOf(player1)).cmp(web3.toBigNumber(0)) === 0, 'Expected that player one would have no resources immediately after claiming the resource producer');

        // Expect that player one is now recorded as the resource benefactor
        assert.equal(await resourceProducerInstance.resourceBenefactor(), player1, 'Expected that player one would be the resource benefactor');

        // Expected that after 1 block the user will have due the appropriate quantity of resources
        await web3.evm.minePromise();
        // Rate of issuance is calculated on level 1 being the first element in the array (0), so don't increment the current level yet.
        assert.isTrue((await resourceProducerInstance.calculateAmountOfResourceUnclaimedByBenefactor()).cmp(levelRates[currentLevel]) === 0, 'Expected that player one would be able to claim the appropriate quantity of resources');

        // Expect that we can claim the resources immediately after being awarded them
        await resourceProducerInstance.claimAccruedResource( {from: player1});
        assert.isTrue((await resourceInstance.balanceOf(player1)).cmp(levelRates[currentLevel]) === 0);

        // And that we would be able to claim more since another block has been mined
        assert.isTrue((await resourceProducerInstance.calculateAmountOfResourceUnclaimedByBenefactor()).cmp(levelRates[currentLevel]) === 0, 'Expected that player one would be able to claim the appropriate quantity of resources');

        // Check that it's possible to upgrade to the next level at the appropriate time
        currentLevel++;
        await resourceInstance.approve(resourceProducerInstance.address, upgradeCosts[currentLevel], {from: player1});
        await web3.evm.minePromise();
        // Two blocks have gone by and we should now just have the appropriate quantity of resources (calculated on the current level since we haven't upgraded the resource yet).
        assert.isTrue((await resourceProducerInstance.calculateAmountOfResourceUnclaimedByBenefactor()).cmp((levelRates[currentLevel-1]).mul(3)) === 0, 'Expected that player one would be able to claim the appropriate quantity of resources');

        await resourceProducerInstance.upgradeResource({from: player1});
        // Expect that player one should have no remaining resources immediately after upgrading the resource producer
        assert.isTrue((await resourceInstance.balanceOf(player1)).cmp(web3.toBigNumber(0)) === 0, 'Expected that player one would have no resources immediately after upgrading the resource producer');

        // Expected that after 1 block the user will have due the appropriate quantity of resources
        // Note: now that the production is up and running, upgrading currently does not incur a penalty.
        assert.isTrue((await resourceProducerInstance.calculateAmountOfResourceUnclaimedByBenefactor()).cmp(levelRates[currentLevel]) === 0, 'Expected that player one would be able to claim the appropriate quantity of resources');
    });

    async function getDetailsOfSmartContractArray(arrayLength, accessorFn) {
        let values = [];
        async function getValue(_index) {
            values[_index] = await accessorFn(_index);
        }

        let promises = [];
        for(let i = 0; i < arrayLength; i++) {
            promises.push(getValue(i));
        }

        await Promise.all(promises);
        return values;
    }

});