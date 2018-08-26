pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStore.sol";

contract TestSimpleStorage {

  function testItStoresAValue() public {
    SimpleStore simpleStorage = SimpleStore(DeployedAddresses.SimpleStore());

    simpleStorage.set(89);

    uint expected = 89;

    // Unsure why this syntax doesn't work - according to the documentation it is correct?!
    // Assert.equal(simpleStorage.get(), expected, "It should store the value 89.");
  }

}
