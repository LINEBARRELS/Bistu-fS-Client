var React = require('react');

class BlockContent extends React.Component{
  constructor() {
    super();
  }

  render(){

    return <div className='block-content'>{this.props.children}</div>

  }
}

export {BlockContent}
