pragma solidity ^0.4.0;

import './Resource.sol';

/**
 * @title Wood
 * A contract to represent an in-game resource of type Wood. The resource is fungible and can be used in-game to interact with the world - either on its own or in combination with other resources.
 * @dev The contract currently does not add extra features over an Open Zeppelin Mintable ERC-20 token.
 * @dev The resource has been created as a separate contract to make it possible to track the different addresses when deploying with the Truffle Framework.
 * Note: This is an initial draft and should not be considered production ready.
 */
contract Wood is Resource {
}
