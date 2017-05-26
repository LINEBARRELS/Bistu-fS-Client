var React=require('react')

import {DownloadItem} from "../util/downloadItem.js";
import {pageAction} from "../Action/Page.js"

import { Map, List } from 'immutable';

class Download extends React.Component {
	constructor(args) {
		super(args)

		this.state={downloading:{},filter:''};


	}


	toIndex(){

		this.context.store.dispatch(pageAction('index'));
				if(document.querySelector('.sideItem.on')){
			document.querySelector('.sideItem.on').classList.remove('on')
		}
		
		document.querySelector('.sideItem').classList.add('on')
	}

	componentWillMount(){

		var t=this.context.store.getState().toJS().downloadReducer;
		this.setState({downloading:this.context.store.getState().toJS().downloadReducer})
	}

	componentDidMount(){

		this.context.store.subscribe(()=>{
			// console.log(this.context.store.getState().toJS().downloadReducer);
			this.setState({downloading:this.context.store.getState().toJS().downloadReducer})
		})
	}

	

	render(){
		var content=null;
		
		if(Object.keys(this.state.downloading).length==0){
			content=<p className='downloadVoid'>当前没有下载任务<span onClick={this.toIndex.bind(this)}>去找点东西下吧</span></p>
					

		}else{
			content=[];
			var tem=this.state.downloading;
			for(let i in tem){
				content.push(<DownloadItem name={tem[i].fileName} completed={tem[i].completed} total={tem[i].total} hash={tem[i].hash} key={i}/>)
			
			}
		}


		return <div className='mainSection' >
			{content}
		</div>
	}
}

Download.contextTypes={
	store:React.PropTypes.object,
	ipc:React.PropTypes.object
}
export {Download}