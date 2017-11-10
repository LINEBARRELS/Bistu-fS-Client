import React, {Component} from 'react';

class SearchInner extends Component {
  constructor() {
    super();
  }

  warp(event){
    this.props.onClick(event,this.props.option);
  }

  render(){
    return <div className='result-item' onClick={this.warp.bind(this)}>
      <div className='header'>{this.props.option.name}</div>
      <div className='meta'>{this.props.option.intro}</div>
    </div>
  }
}

export {SearchInner}
