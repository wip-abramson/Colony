# Colony
Loom ant colony game


## Smart Contract Design
The current idea is that each different type of in-game resource will be modelled as an ERC20 token (so that they are fungible). 

Each player will be allocated a quantity of each type of resource - this could be dependant on a number of different factors such as faction, difficulty etc.

In-game resources will be required to produce in-game objects that will be necessary for working towards an objective (and for preventing an opponent from reaching theirs first).

There will be a number of contracts which will produce a quantity of a specific resource (each block) that the benefactor that has captured the resource producing contract will be able to claim. 

The resource producing contract can be 'upgraded' in order to increase the rate in which they produce resources and to make it more difficult for an opponent to capture the resource producing contract themselves. 

The location of the resource producing contracts is likely to be known upfront - and specific to a given 'map'. 

The resource producing contracts will be limited to producing a fixed number of a given resource; which will be determined when it is deployed. 

*Note: it has yet to be decided what constraints there will be around how a resource producing contract is initially captured and how an opponent can capture it themselves (to become the benefactor of the produced resources)* 

*Note: it might be interesting to experiment with a persistant resource that exists in all games and is carries between games and becomes like a stake e.g. lose the game and have to start back at square one and at a disadvantage next game.*

### Smart Contract Deployment
Each resource contract will be deployed at the very start of the deployment process (Truffle Framework Migration script).

The resource producing contracts will then be deployed. 

After the resource producing contracts have been deployed and we have an address for them, they will be allocated the appropriate number of resources in the respective ERC20 tokens.

The players will then be allocated a number of resources in the ERC20 tokens.

The ERC20 token contract will then be locked that no more resources may be created. 

*Note: the rest of the game artifacts have yet to be designed, but there will likely be more contract to be deployed.*

# Getting started

## Testing
### Smart Contract Tests
> truffle develop
> test
