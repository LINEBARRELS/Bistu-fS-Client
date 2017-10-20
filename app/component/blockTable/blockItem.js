var React = require('react');

class BlockItem extends React.Component{
  constructor() {
    super();
  }

  render(){
    // let content = [];
    //
    // for (let i of Object.values(this.props.val)) {
    //   content.push(<div className='block-content'>{i.toString()}</div>);
    // }
    let on = this.props.status?' on':null;
    console.log(this.props.ondbClick);
    return <div className={'block-item'+on} onDoubleClick={this.props.ondbClick.bind(this,this.props.data)}>
    {this.props.children}</div>

  }
}

export {BlockItem}
