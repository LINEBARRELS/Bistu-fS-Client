import React, {Component} from 'react';

import {SearchInner} from './searchInner.js'

class SearchResult extends Component {
  constructor() {
    super();
  }

  render() {

    console.log(this.props.result);
    let child = [];
    for (let i  of this.props.result) {
      child.push(<SearchInner option={i} onClick={this.props.clickHandler}/>);
    }
    return <div className='searchResult'>
    {child}
    </div>
  }
}

export {SearchResult}
