var React=require('react');


import { connect } from 'react-redux'

class DownLoad extends React.Component{

	on(){
		this.props.dispatch({
			type:'load'
		})
	}	


	render(){
		return <div>
			<button onClick={this.on.bind(this)}>123123</button>
		</div>
	}
}


// function mapStateToProps(state){
//   var st=state.toJS();
//   return {
//     loading:st.loading
//   }
// }

export default connect()(DownLoad)