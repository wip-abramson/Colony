pragma solidity ^0.4.0;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

/**
 * @title Resource
 * A contract to represent an in-game resource. The resource is fungible, but distinct in its identity. It can be used in-game to interact with the world - either on its own or in combination with other resources.
 * @dev The contract currently does not add extra features over an Open Zeppelin Mintable ERC-20 token.
 * Note: This is an initial draft and should not be considered production ready.
 */
contract Resource is MintableToken {
}
