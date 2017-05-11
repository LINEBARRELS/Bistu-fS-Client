var React=require('react')

import {DownloadItem} from "../util/downloadItem.js";

import { Map, List } from 'immutable';

class Download extends React.Component {
	constructor(args) {
		super(args)

		this.state={downloading:Map({})};


	}
	
	// var b=a.updateIn(['li'],(v)=>v.update(['now'],(v)=>v=12450))
	componentDidMount(){
		// this.context.ipc.on('newFm',(event,fileMission)=>{
		// 	this.setState(this.state.setIn(['downloading',fileMission.fileName],Map({completed:0,total:fileMission.total})))
		// })

		// this.context.ipc.on('fmUpdate',(event,fileMission)=>{

		// })
	}

	componentWillMount(){
		// this.setState({downloading:this.state.downloading.setIn(['233'],Map({completed:0,total:12450}))})
	}

	render(){
		var content=null;
		console.log('down render')
		if(Object.keys(this.state.downloading.toJS())===0){
			content='当前没有文件下载'
		}else{
			content=[];
			var tem=this.state.downloading.toJS();
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