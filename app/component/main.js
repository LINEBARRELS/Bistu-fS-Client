var React=require('react')
var fs=require('fs')


// import {peer} from "../dist/peer.js"

import {Upload} from "./file/upload.js";
import {Download} from "./file/download.js";
import {User} from "./user/user.js";
import {Index} from "./index/index.js"
import {Message} from "./util/message.js"

import {fileAction} from "./Action/Files.js";

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
			this.setState({cur:this.context.store.getState().routerReducer.cur})
		})


		so.on('message', (data)=>{
			console.log(data);
		});

		so.on('searchResult', (data)=>{
			console.log(data);
			this.context.store.dispatch(fileAction(data))
		});
	}




	render(){
		// console.log(this.state.cur);
		// console.log(this.context.store.getState());
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

	  	return <div id='main'><div className='process'><div></div></div><Message /><CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={300}>
			{content}
        </CSSTransitionGroup></div>

	  
	}
}


Main.contextTypes={
	store:React.PropTypes.object
}



export {Main};