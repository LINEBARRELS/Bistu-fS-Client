var React=require('react');


import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {Unit} from '../util/unit.js'
import {UnitItem} from '../util/unitItem.js'

import {BlockTable} from '../blockTable/blockTable.js'

class DownLoad extends React.Component{

	on(){
		this.props.dispatch({
			type:'load'
		})
	}	


	render(){
		return <div>
		<Unit>
			<UnitItem data='on'>进行中</UnitItem>
			<UnitItem data='off'>已完成</UnitItem>
		</Unit>

		<BlockTable tableData={this.props.download}/>
		</div>
	}
}


function mapStateToProps(state){
  var st=state.toJS();
  return {
    download:st.downloadReducer
  }
}

export default connect(mapStateToProps)(DownLoad)