var React=require('react')
var fs=require('fs')


// import {peer} from "../dist/peer.js"

import {Upload} from "./file/upload.js";
import {Download} from "./file/download.js";
import {User} from "./user/user.js";
import {Index} from "./index/index.js"
import {Message} from "./util/message.js"

import {fileAction} from "./Action/Files.js";
import {fmUpdateAction} from "./Action/Missionupdate.js";

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
			let nextProcess = this.context.store.getState().toJS().processReducer,
				nextCur=this.context.store.getState().toJS().routerReducer;



				this.refs.pro.style.width=nextProcess.process+'%'

			
			this.setState({cur:nextCur.cur})
		})

		this.context.ipc.on('fmReturn',(event,fm)=>{
			this.context.store.dispatch(fmUpdateAction(fm))
		})

		setInterval(()=>{
			this.context.ipc.send('watchFm');
		}, 500);

		this.context.ipc.on('searchResult',(event,data)=>{
			console.log('接收到搜索结果',data);
			this.context.store.dispatch(fileAction(data))
		})
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

	  	return <div id='main'><div className='process'refs='proBar'><div ref='pro'></div></div><Message /><CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={150}>
			{content}
        </CSSTransitionGroup></div>

	  
	}
}


Main.contextTypes={
	store:React.PropTypes.object,
	ipc:React.PropTypes.object
}



export {Main};