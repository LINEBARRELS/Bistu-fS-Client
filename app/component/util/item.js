var React = require('react');

class Item extends React.Component {
  constructor() {
    super();
  }

  render(){
    return <div className='item'>
    <a>{this.props.user}</a>
    <div>{this.props.unread}</div>
    <div>{this.props.last}</div>
    </div>
  }
}

export {Item}
