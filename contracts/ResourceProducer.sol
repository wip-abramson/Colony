pragma solidity ^0.4.0;

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 * @dev based on the code https://github.com/OpenZeppelin/openzeppelin-solidity/tree/master/contracts/token/ERC20
 */
contract ERC20 {
  function totalSupply() public view returns (uint256);

  function balanceOf(address _who) public view returns (uint256);

  function allowance(address _owner, address _spender)
    public view returns (uint256);

  function transfer(address _to, uint256 _value) public returns (bool);

  function approve(address _spender, uint256 _value)
    public returns (bool);

  function transferFrom(address _from, address _to, uint256 _value)
    public returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}

/**
 * @title ResourceProducer
 * 
 * A contract which models the behaviour of an in-game element which can generate a resource at a constant rate. 
 * @dev The resource which is generated is an ERC20 compatible token - of which multiple ResourceProducers can be creating supply of at a given rate.
 * @dev The contract must be initialised with two arrays - one that represents the issuance rate at a given upgrade level and the other that represents the cost to upgrade the resource.  
 * @dev The specified maxSupply of tokens must be issued to the contract's address. 
 * Note **This is not production ready** - it's still very much a rough draft to experiment with an idea. 
 */
contract ResourceProducer {
    // The address of the player that currently benefits from controlling the resource.
    address public resourceBenefactor;
    //TODO determine if it is worth reducing the datatype to something smaller
    // The current amount of the resource that is remaining to be aqcuired. 
    uint public maxSupply;
    // A uint32 can store up to the number 4,294,967,295. After a little over 3 years of the Ethereum network being live it is at block number 6,115,930, so this size variable supports the contract way beyond its expected usefulness. 
    // uint24 can store up to the number 16,777,216 ...
    uint32 public blockNumberUpdated;
    // A uint8 can store up to 255 levels 
    uint8 public level;
    // Supports upto 255 different resource types
    ERC20 public resourceType;
    
    uint8[] levelRates;
    uint8[] upgadeCosts;
    
    constructor(uint _maxSuppy, ERC20 _resourceType, uint8[] _levelRates, uint8[] _upgradeCosts) public {
        require(_maxSuppy > 0);
        require(_levelRates.length == _upgradeCosts.length);
        maxSupply = _maxSuppy;
        //TODO think about handling other business logic such as valid level rates
        levelRates = _levelRates;
        upgadeCosts = _upgradeCosts;
        resourceType = _resourceType;
        // Initially the resource is not controlled by any player.
        resourceBenefactor = address(0x0);
    }
    
    function getUpgradeCostForLevel(uint8 _level) public constant returns(uint8) {
        require(_level > 0);
        return upgadeCosts[(_level - 1)];
    }
    
    function getRateAtLevel(uint8 _level) public constant returns(uint8) {
        require(_level > 0);
        return levelRates[(_level - 1)];
    }
    
    /**
     * Claims the resource for the specified player including any accrued resources which we unspent.
     * 
     * TODO determine how to make it more difficult to claim a resource or add more on-chain criteria around it. Perhaps the unspent resources act as a stake that has to be paid to gain control from another player.
     */
    function becomeBenefactorOfResource() external {
        if(resourceBenefactor == address(0x0)) {
            blockNumberUpdated = uint32(block.number);
        }
        resourceBenefactor = msg.sender;
    }
    
    function claimAccruedResource() public {
        require(msg.sender == resourceBenefactor);
        uint amountAccroued = _calculateUnclaimedResources();
        maxSupply = maxSupply - amountAccroued;
        uint32 nextBlockNumber = uint32(block.number) + 1;
        assert(nextBlockNumber > block.number);
        blockNumberUpdated = nextBlockNumber;
        require(resourceType.transfer(msg.sender, amountAccroued) == true);
    }
    
    function upgradeResource() external {
        // A resource that has not been claimed can not be upgraded.
        require(blockNumberUpdated != 0 && resourceBenefactor != address(0x0));
        require(msg.sender == resourceBenefactor);
        claimAccruedResource();
        uint available = resourceType.balanceOf(msg.sender);
        uint8 nextLevel = level + 1;
        uint8 cost = getUpgradeCostForLevel(nextLevel);
        require(available >= cost);
        level = nextLevel;
    }
    
    function calculateAmountOfResourceUnclaimedByBenefactor() constant external returns(uint _amount) {
        if (blockNumberUpdated == 0 && resourceBenefactor == address(0x0)) {
            _amount = 0; 
        } else {
            _amount = _calculateUnclaimedResources();
        }
    }
    
    function _calculateUnclaimedResources() constant private returns(uint _amount) {
        uint32 numBlocksPast = uint32(block.number) - blockNumberUpdated;
        _amount = numBlocksPast * getRateAtLevel(level);
        if(_amount > maxSupply) {
            _amount = maxSupply;    
        }
    }
}
