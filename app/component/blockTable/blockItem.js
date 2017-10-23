var React = require('react');

class BlockItem extends React.Component{
  constructor() {
    super();
  }

  render(){

    let on = this.props.status?' on':null;
    return <div className={'block-item'+on} onDoubleClick={this.props.ondbClick.bind(this,this.props.data)}>
    {this.props.children}</div>

  }
}

export {BlockItem}
