var React = require('react');

class Item extends React.Component {
  constructor() {
    super();
  }

  render(){

    let tip = this.props.unread === 0?null:<div className='item-tip'>{this.props.unread}</div>

    return <div className='item' onClick={(event)=>{
        this.props.onClick(this.props.value)
    }}>
    <a className='item-title'>{this.props.title}</a>
    {tip}
    <div className='item-content'>{this.props.content}</div>
    </div>
  }
}

export {Item}
