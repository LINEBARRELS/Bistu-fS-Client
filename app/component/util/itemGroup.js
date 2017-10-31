var React = require('react');

class ItemGroup extends React.Component {
  constructor() {
    super();
  }

  render(){
    return <div className='item-group'>
    {this.props.children}
    </div>
  }
}

export {ItemGroup}
