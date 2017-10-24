var React = require('react');
var electron= require('electron');
import PropTypes from 'prop-types'

import {connect} from 'react-redux'

import {Poll} from '../util/poll.js'
import {PollBlock} from '../util/pollBlock.js'

import Banner from '../util/banner.js'

var ipc =electron.ipcRenderer;



class Index extends React.Component {

  render() {
    console.log(this.props.search);
    let poll_item = [];
    this.props.search.forEach((item, index) => {
      poll_item.push(<PollBlock className={item.file_type} header={item.mission_name} content={item.file_name} data={item.hash} key={item.hash}/>)
    })
    return <div>
      <Banner />
      <Poll >
        {poll_item}
      </Poll></div>;
  }
}

function db(data){
  ipc.send('download',data)
}

function mapStateToProps(state) {

  var st = state.toJS();
  return {search: st.searchReducer.result ,current: st.routerReducer.cur}
}

export default connect(mapStateToProps)(Index);
