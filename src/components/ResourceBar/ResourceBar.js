/**
 * Created by will on 05/08/18.
 */
import React from 'react';

import Resource from '../Resource/Resource';

import styles from './ResourceBar.css';


const ResourceBar = ({resources}) => {
  return (
    <div className='resourceBar'>
      {resources.map((resource) => <Resource type={resource.type} production={resource.production}/>)}

      <button>Refresh Resources</button>


    </div>
  )
};

export default ResourceBar;



