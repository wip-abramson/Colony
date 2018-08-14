/**
 * Created by will on 05/08/18.
 */
import React from 'react';

import Iron from '../../../assets/9.iron.png';
import Clay from '../../../assets/10.clay.png';
import Eggs from '../../../assets/8.egg.png';
import Food from '../../../assets/4.food.png';
import Nectar from '../../../assets/12. nectar point.png';

import styles from './Resource.module.css';

const Resource = ({type, typeId, production, icon}) => {

  function getResourceImage() {
    switch (type) {
      case 'Iron':
        return Iron;
      case 'Clay':
        return Clay;
      case 'Eggs':
        return Eggs;
      case 'Food':
        return Food;
      case 'Nectar':
        return Nectar;

    }
  }

  return (
      <div style={{"display": "flex", width: "100%"}}>
        <img src={getResourceImage()}/>
        <span>{type}</span>
        <span> :  </span>
        <span>{production}</span>
      </div>
  )
};

export default Resource;