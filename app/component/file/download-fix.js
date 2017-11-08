var React = require('react');
var electron= require('electron');
var ipc = electron.ipcRenderer;


import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Progress} from '../util/progress.js'

import {BlockTable} from '../blockTable/blockTable.js'
import {BlockItem} from '../blockTable/blockItem.js'
import {BlockContent} from '../blockTable/blockContent.js'

class DownLoad extends React.Component {

  on() {
    this.props.dispatch({type: 'load'});
  }

  render() {


    let titles = ['文件名', '类型', '完成度', '即时速度'];
    let blockItems = [];
    for (let i of Object.entries(this.props.download)) {
      // let blockValue = Object.values(i);
      blockItems.push(<BlockItem key={i[0]} ondbClick={itemDBClick} data={i[0]} status={i[1].status}>
          <BlockContent percent='2'>{i[1].fileName}</BlockContent>
          <BlockContent percent='1'>{i[1].createdBy}</BlockContent>
          <BlockContent percent='1'><Progress present={i[1].completed}/></BlockContent>
          <BlockContent percent='1'>{Bit(12412515)}</BlockContent>
        </BlockItem>)
    }
    let content = blockItems.length === 0 ? <p className='download-null'>没有下载任务</p> : blockItems;
    return <div>
      <BlockTable title={titles}>
        {content}
      </BlockTable></div>
  }
}

function itemDBClick(data){
    ipc.send('triggle',data)
}

function mapStateToProps(state) {
  var st = state.toJS();
  return {download: st.downloadReducer}
}

export default connect(mapStateToProps)(DownLoad)
