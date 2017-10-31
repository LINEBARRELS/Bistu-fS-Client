var React = require('react');
import {connect} from 'react-redux'

import {Input} from '../util/input.js'
import {ItemGroup} from '../util/itemGroup.js'
import {Item} from '../util/item.js'

class Chat extends React.Component {
  constructor() {
    super();
  }

  render(){
    // let groupContent = [];
    // for (let i of this.props.message) {
    //   groupContent.push(<Item></Item>);
    // }
    console.log(this.props.message);
    return <div className='col-container'>
    <div className='col col-2'>
    </div>
    <div className='col col-5'>{214124}</div>
    </div>
  }
}

function mapStateToProps(state) {
  var st = state.toJS();
  return {message: st.messageReducer}
}

export default connect(mapStateToProps)(Chat)
