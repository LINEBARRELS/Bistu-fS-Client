var React=require('react')

import {DownloadItem} from "../util/downloadItem.js";

import { Map, List } from 'immutable';

class Download extends React.Component {
	constructor(args) {
		super(args)

		this.state=Map({downloading:Map({ 233:Map({completed:45,total:100}) }) });
	}
	
	// var b=a.updateIn(['li'],(v)=>v.update(['now'],(v)=>v=12450))
	componentDidMount(){
		this.context.ipc.on('fm',(event,fileMission)=>{
			this.setState(this.state.setIn(['downloading',fileMission.fileMission],Map({completed:0,total:fileMission.total})))
		})
	}

	render(){
		var content=null;

		if(Object.keys(this.state.toJS().downloading)===0){
			content='当前没有文件下载'
		}else{
			content=[];
			var tem=this.state.toJS().downloading;
			for(let i in tem){
				content.push(<DownloadItem name={i} completed={tem[i].completed} total={tem[i].total}/>)
			
			}
			
			console.log(this.state.toJS());
		}

		return <div className='mainSection'>
			{content}
		</div>
	}
}

Download.contextTypes={
	ipc:React.PropTypes.object,

}
export {Download}