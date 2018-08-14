/**
 * Created by will on 05/08/18.
 */
import React from 'react';

import ResourceBar from '../ResourceBar/ResourceBar';
import Colony from '../Colony/Colony';

const dens = [[{type: 2, typeName: 'Lavae Day Care', resources: [{type: 'Food', production: 5}], upgradeResources: [{type: 'Food', production: 5}]}, {type: 0, typeName: 'Den', resources: [{type: 'Food', production: 5}], upgradeResources: [{type: 'Food', production: 5}]}, {type: 0, typeName: 'Den', resources: [{type: 'Food', production: 5}], upgradeResources: [{type: 'Food', production: 5}]}],
  [{type: 0, typeName: 'Den', resources: [{type: 'Food', production: 5}], upgradeResources: [{type: 'Food', production: 5}]}, {type: 6, typeName: 'Queen Den', resources: [{type: 'Food', production: 10}, {type: 'Eggs', production: 20}, {type: 'Clay', production: 4}], upgradeResources: [{type: 'Clay', production: 5}, {type: 'Iron', production: 4}]}, {type: 0, typeName: 'Den', resources: [{type: 'Food', production: 5}], upgradeResources: [{type: 'Food', production: 5}]}],
    [{type: 1, typeName: 'Barracks', resources: [{type: 'Food', production: 5}], upgradeResources: [{type: 'Food', production: 5}]}, {type: 0, typeName: 'Den', resources: [{type: 'Food', production: 5}], upgradeResources: [{type: 'Food', production: 5}]}, {type: 0, typeName: 'Den', resources: [{type: 'Food', production: 5}], upgradeResources: [{type: 'Food', production: 5}]}]]

const resources = [{type: 'Food', production: 10}, {type: 'Eggs', production: 20}, {type: 'Clay', production: 4}, {type: "Nectar", production: 5}, {type: "Iron", production: 9}]

const Game = () => {
  return (
    <div>
      <ResourceBar resources={resources}/>
      <Colony dens={dens}/>
    </div>
  )
}

export default Game;