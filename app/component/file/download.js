var React=require('react')

import {DownloadItem} from "../util/downloadItem.js";

import { Map, List } from 'immutable';

class Download extends React.Component {
	constructor(args) {
		super(args)

		this.state={downloading:{}};


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
		
		if(Object.keys(this.state.downloading)===0){
			content='当前没有文件下载'
		}else{
			content=[];
			var tem=this.state.downloading;
			for(let i in tem){
				content.push(<DownloadItem name={i} completed={tem[i].completed} total={tem[i].total} key={i}/>)
			
			}
			
			console.log(this.state);
		}

		return <div className='mainSection'>
			{content}
		</div>
	}
}

Download.contextTypes={
	store:React.PropTypes.object,
	ipc:React.PropTypes.object
}
export {Download}