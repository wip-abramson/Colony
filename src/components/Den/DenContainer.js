/**
 * Created by will on 05/08/18.
 */
import React from 'react';

import SelectedDen from './SelectedDen';
import Den from './Den';




class DenContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      selected: false
    }

    this.onDenClicked = this.onDenClicked.bind(this);
  }

  onDenClicked() {
    this.setState({
      selected: !this.state.selected
    })
  }


  render() {
    console.log("DEN CONTIANTER")
    return (
      <div className="denContainer" onClick={this.onDenClicked}>
        {this.state.selected ? <SelectedDen den={this.props.den}/> : <Den den={this.props.den}/> }
      </div>
    )
  }
}

export default DenContainer;