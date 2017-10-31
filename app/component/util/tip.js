var React = require('react');

class Tip extends React.Component {
  constructor() {
    super();
  }

  render(){
    return <div className='tip'>
    {this.props.children}
    </div>
  }
}

export {Tip}
