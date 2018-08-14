/**
 * Created by will on 05/08/18.
 */
import React from 'react';

import Ant from '../../../assets/6.normal ant.png';
import Queen from '../../../assets/1.queen.png';
import Soldier from '../../../assets/2. soldier.png';
import Babysitter from '../../../assets/5. baby sitter.png';

const Den = ({den}) => {

  function getDenImage() {
    switch(den.type) {
      case 0:
        return Ant;
      case 1:
        return Soldier;
      case 2:
        return Babysitter;
      case 6:
        return Queen
    }

  }

  return (
    <div className="den">
      <img src={getDenImage()}/>
    </div>
  )
};

export default Den;