/**
 * Created by will on 05/08/18.
 */
import React from 'react';

import DenContainer from '../Den/DenContainer';

import styles from './styles.css';

const Colony = ({dens}) => {
  return (
    <div className='colonyGrid'>
      {dens.map((denRow, x) => {
        console.log(denRow)
        return denRow.map((den, y) => {
          console.log(den)
          return (<DenContainer den={den} x={x} y={y}/>)
      })
      } )}
    </div>
  )
};

export default Colony;