pragma solidity ^0.4.24;

/**
 * @title Colony
 * A contract to represent an in-game ant colony which consists of multiple chambers. The different chambers of the colony initially start out as empty, but by expending resources they can be configured to geenerate specific resources at a predefined rate.
 * Note Currently the contract only supports the colony generating a single resource that is accrued over time at a constant rate.
 * The resource can be spent (currently only on increating the accrual rate) and upgraded.
 * @dev The contract must be initialised with two arrays - one that represents the issuance rate at a given upgrade level and the other that represents the cost to upgrade the resource.  
 * Note **This is not production ready** - it's still very much a rough draft to experiment with an idea. 
 */
contract Colony {
    struct Resource {
        uint amount;
        uint8 blockNumber;
        uint8 level;
        uint8 rate;
        uint8 resourceType;
    }
    
    uint8[] public levelRates;
    uint8[] public upgadeCosts;
    Resource public resource;
    
    constructor(uint8[] _levelRates, uint8[] _upgradeCosts) public {
        require(_levelRates.length == _upgradeCosts.length);
        require(_upgradeCosts[0] == 0);
        levelRates = _levelRates;
        upgadeCosts = _upgradeCosts;
    }
    
    function constructResource() external {
        // assert(resource.blockNumber == 0);
        resource = Resource(0, uint8(block.number + 1), 0, levelRates[0], 0);
    }
    
    function upgradeResource() external {
        require(resource.blockNumber != 0);
        uint available = _calculateAvailableResources();
        uint8 nextLevel = resource.level + 1;
        uint8 cost = levelRates[nextLevel];
        require(available >= cost);
        resource.amount = available - cost;
        resource.blockNumber = uint8(block.number);
        resource.level = nextLevel;
        resource.rate = levelRates[resource.level];
    }
    
    function getAvailableResource() constant external returns(uint _amount) {
        if (resource.blockNumber == 0) {
            _amount = 0; 
        } else {
            _amount = _calculateAvailableResources();
        }
    }
    
    function _calculateAvailableResources() constant private returns(uint _amount) {
        uint8 numBlocksPast = uint8(block.number) - resource.blockNumber;
        _amount = resource.amount + (numBlocksPast * resource.rate);
    }
}
