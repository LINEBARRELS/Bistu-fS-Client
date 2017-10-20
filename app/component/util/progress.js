var React = require('react');

class Progress extends React.Component {
  constructor() {
    super();
  }

  render() {
    let on = this.props.present == 1?'process':'process on';
    let st = {width:this.props.present*100+'%'}
    return <div className={on}> <div style={st}></div> </div>
  }
}


export {Progress}
