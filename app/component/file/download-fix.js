var React = require('react');

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Unit} from '../util/unit.js'
import {UnitItem} from '../util/unitItem.js'
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
      let blockValue = Object.values(i);
      blockItems.push(<BlockItem key={i[0]} ondbClick={itemDBClick} data={i[0]} status={i[1].status}>
          <BlockContent>{i[1].fileName}</BlockContent>
          <BlockContent>{i[1].type}</BlockContent>
          <BlockContent><Progress present={i[1].completed}/></BlockContent>
          <BlockContent>{Bit(12412515)}</BlockContent>
        </BlockItem>)
    }
    return <div>
      <Unit id='download-bar'>
        <UnitItem data='on'>进行中</UnitItem>
        <UnitItem data='off'>已完成</UnitItem>
      </Unit>

      <BlockTable title={titles}>
        {blockItems}
      </BlockTable></div>
  }
}

function itemDBClick(data){
    console.log(data)
}

function mapStateToProps(state) {
  var st = state.toJS();
  return {download: st.downloadReducer}
}

export default connect(mapStateToProps)(DownLoad)
