var React=require('react')
var fs=require('fs')


// import {peer} from "../dist/peer.js"

import {Upload} from "./file/upload.js";
import {Download} from "./file/download.js";
import {User} from "./user/user.js";
import {Index} from "./index/index.js"
import {Message} from "./util/message.js"

var CSSTransitionGroup=React.addons.CSSTransitionGroup;


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
		var content = null
		switch(this.state.cur){
	  		case 'index':

	  		   	content =<Index key='index'/>
	  		   	break;
	  		case 'download':
	  		   
	  		  	content =<Download key='download'/>
	  		  	break;
	  		case 'upload':
	  		   
	  			content =<Upload key='upload'/>
	  			break;
	  		case 'user':
	  		  
	  			content =<User key='user'/>
	  			break;
	  	}

	  	return <div id='main'><Message /><CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
			{content}
        </CSSTransitionGroup></div>

	  
	}
}


Main.contextTypes={
	store:React.PropTypes.object
}



export {Main};