var React=require('react')
var fs=require('fs')


// import {peer} from "../dist/peer.js"

import {Upload} from "./file/upload.js";
import {Download} from "./file/download.js";
import {User} from "./user/user.js";
import {Index} from "./index/index.js"

class Main extends React.Component {

	constructor(props){
		super(props)

		this.state={room:'',cur:'index'};

 
	}

	
	shouldComponentUpdate(nextProp,nextState){
		// console.log('should',nextState);
		if (nextState.cur===this.state.cur) {
			return false;
		}
		else{
			return true;
		}
	}

	componentDidMount(){
		this.context.store.subscribe(()=>{
			// console.log('cur改变');
			this.setState({cur:this.context.store.getState().cur})
		})
	}




	render(){
		// console.log(this.state.cur);

		switch(this.state.cur){
	  		case 'index':
	  		   
	  		   	return <div id='main'><Index /></div>
	  		case 'download':
	  		   
	  		  	return <div id='main'><Download/></div>
	  		case 'upload':
	  		   
	  			return <div id='main'><Upload/></div>
	  		case 'user':
	  		  
	  			return <div id='main'><User/></div>
	  	}



	  
	}
}


Main.contextTypes={
	store:React.PropTypes.object
}



export {Main};