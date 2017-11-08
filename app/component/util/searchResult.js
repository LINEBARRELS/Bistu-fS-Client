import React, {Component} from 'react';

class SearchResult extends Component {
  constructor() {
    super();
  }

  renderChild(){

  }

  render() {

    console.log(this.props.result);
    let child = [];
    for (let i  of this.props.result) {
      child.push(this.renderChild(i));
    }
    return <div className='searchResult'>
    {child}
    </div>
  }
}

export {SearchResult}
