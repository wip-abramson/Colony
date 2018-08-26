/**
 * Created by will on 05/08/18.
 */
import React from 'react';

import Resource from '../Resource/Resource'

const SelectedDen = ({den}) => {
  return (
    <div>
      <h2>{den.typeName}</h2>
      {den.resources.map((resource) => <Resource type={resource.type} production={resource.production}/>)}
      <div>
        <p>Cost to upgrade</p>
        {den.upgradeResources.map((resource) =>  <Resource type={resource.type} production={resource.production}/>
        )}
      </div>
      <button>upgrade</button>
    </div>
  )
};

export default SelectedDen;