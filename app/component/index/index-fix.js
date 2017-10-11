var React=require('react');
import PropTypes from 'prop-types'


import { connect } from 'react-redux'


import {Poll} from '../util/poll.js'
import {PollBlock} from '../util/pollBlock.js'

import {Banner} from '../util/banner.js'

class Index extends React.Component{

	render(){
		// console.log(this.props.search);
		let poll_item=[];
		this.props.search.forEach((item,index)=>{
			poll_item.push(<PollBlock className={item.type} header={item.missionName} content={item.fileName}/>)
		})
		return <div>
				<Banner />
				<Poll content={this.props.search}>
					{poll_item}
				</Poll>
		</div>;
	}
}


function mapStateToProps(state){

  var st=state.toJS();
  return {
    search:st.searchReducer,
    current:st.routerReducer.cur
  }
}


export default connect(mapStateToProps)(Index);