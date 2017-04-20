var React=require('react')
var fs=require('fs')
import {file} from "../../dist/file.js";


var CSSTransitionGroup=React.addons.CSSTransitionGroup
class Index extends React.Component {
	constructor(args) {
		super(args)

		this.state={search:''};
	}

	search(){
		so.emit('search',this.state.search)
	}




	handleChange(e){
		this.setState({search: event.target.value});
	}

	
	render(){

		return <div className='mainSection'>
			<div className='navBar'>
				<span className='input'>
					<input type='text' placeholder='搜索' onChange={this.handle.bind(this)}/>
					<button>Search</button>
				</span>
			</div>
			<div className='files'>
				<div className='block'></div>
				<div className='block'></div>
				<div className='block'></div>
				<div className='block'></div>
			</div>
			</div>

	}
}


Index.contextTypes={
	ipc:React.PropTypes.object

}

export {Index}