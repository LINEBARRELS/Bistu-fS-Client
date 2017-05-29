var React=require('react')
var fs=require('fs')
// import {file} from "../../dist/file.js";
import {Block} from "../util/block.js";
import {Model} from "../util/model.js";

import {fileAction} from "../Action/Files.js";
import {processAction} from "../Action/Process.js";

import { is } from 'immutable';

var CSSTransitionGroup=React.addons.CSSTransitionGroup
class Index extends React.Component {
	constructor(args) {
		super(args)

		this.state={search:'',files:[],model:null};
	}

	search(){
		
		this.context.ipc.send('search',this.state.search)
		
	}

	searchType(e){
		
		if(event.target.className==='typeIcon'){
			if(document.querySelector('.typeOn')){
				document.querySelector('.typeOn').classList.remove('typeOn')
			}
			e.target.classList.add('typeOn')
			console.log(e.target.getAttribute('data-type'));
			this.context.store.dispatch(processAction(0))
			this.context.ipc.send('searchType',e.target.getAttribute('data-type'))			
		}

	}

	downLoad(e){
		e.stopPropagation();
		if(e.target.className==='more'){
			console.log(e.target.getAttribute('data-value'));
			// this.context.ipc.send('downLoad',e.target.getAttribute('data-value'))
			this.setState({model:e.target.getAttribute('data-value')})
		}

	}

	modelOk(e){
		this.context.ipc.send('downLoad',e.target.getAttribute('data-value'))
		// console.log('hahaha');
		this.setState({model:null})
	}

	modelCancel(e){
		e.stopPropagation()
		this.setState({model:null})
	}



	handleChange(e){
		this.setState({search: event.target.value});
	}

	componentWillMount(){
		var tem=this.context.store.getState().toJS().fileReducer.content;
		if (tem.length!==0) {
			this.setState({files:tem})
		}
	}

	componentDidMount() {
		
		this.context.store.subscribe(()=>{
			// console.log(this.context.store.getState().fileReducer.content);
				var tem=this.context.store.getState().toJS().fileReducer.content;
				this.setState({files:tem})
			
		})

	}



	shouldComponentUpdate(nextProps = {}, nextState = {}){
  		const thisProps = this.props || {}, thisState = this.state || {};
  		if (thisState['search']!==nextState['search']) {
  			return false;
  		}

  		if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      		Object.keys(thisState).length !== Object.keys(nextState).length) {
    		return true;
  		}

  		for (const key in nextProps) {
    		if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
      		return true;
    		}
  		}		

  		for (const key in nextState) {
    		if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
      		return true;
    		}
  		}
  		return false;
	}

	
	render(){
		console.log('index render');

		var blocks=[],
			model=null;

		if(this.state.files.length>0){
		this.state.files.forEach((item,index)=>{
			blocks.push(<Block key={item['_id']} fileName={item.fileName} missionName={item.missionName} type={item.type} detail={item.detail} hash={item.hash}></Block>)
		})
		}else{
			blocks.push(<div id='nothing'>没有搜索结果,去搜点别的东西去吧</div>)
		}

		model=this.state.model?<Model message={this.state.model} ok={this.modelOk.bind(this)} cancel={this.modelCancel.bind(this)}/>:null;

		this.context.store.dispatch(processAction(100))


		return <div className='mainSection'>
			<div className='navBar'>
				<ul className='fileType' onClick={this.searchType.bind(this)}>
					<li className='types' ><a className='typeIcon' data-type='music'>音乐</a></li>
					<li className='types' ><a className='typeIcon' data-type='movie'>电影</a></li>
					<li className='types' ><a className='typeIcon' data-type='game'>游戏</a></li>
					<li className='types' ><a className='typeIcon' data-type='doc'>文档</a></li>
					<li className='types' ><a className='typeIcon' data-type='other'>其他</a></li>
				</ul>
				<span className='input search'>
					<input type='text' placeholder='搜索' onChange={this.handleChange.bind(this)}/>
					<button onClick={this.search.bind(this)}>Search</button>
				</span>
			</div>
			<div className='files' key='fileRoot' onClick={this.downLoad.bind(this)}>
			<CSSTransitionGroup
          		transitionName="example"
          		transitionEnterTimeout={400}
          		transitionLeaveTimeout={300}>
				{blocks}
        	</CSSTransitionGroup>
        	{model}
			</div>
			</div>

	}
}


Index.contextTypes={
	store:React.PropTypes.object,
	ipc:React.PropTypes.object

}

export {Index}