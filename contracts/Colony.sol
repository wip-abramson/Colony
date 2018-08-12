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
   
}
