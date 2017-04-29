var React=require('react')
var fs=require('fs')
import {file} from "../../dist/file.js";
import {Block} from "../util/block.js";

import {fileAction} from "../Action/Files.js";
import {processAction} from "../Action/Process.js";

import { is } from 'immutable';

var CSSTransitionGroup=React.addons.CSSTransitionGroup
class Index extends React.Component {
	constructor(args) {
		super(args)

		this.state={search:'',files:[]};
	}

	search(){
		
		so.emit('search',this.state.search)
	}

	searchType(e){
		
		if(event.target.className==='typeIcon'){
			if(document.querySelector('.typeOn')){
				document.querySelector('.typeOn').classList.remove('typeOn')
			}
			e.target.classList.add('typeOn')
			console.log(e.target.getAttribute('data-type'));
			this.context.store.dispatch(processAction(0))
			so.emit('searchType',e.target.getAttribute('data-type'))			
		}

	}

	downLoad(e){
		e.stopPropagation();
		so.emit('downLoad',e.target.getAttribute('data-value'))
		
	}




	handleChange(e){
		this.setState({search: event.target.value});
	}

	componentDidMount() {

		if (this.context.store.getState().fileReducer.content.length!==0) {
			this.setState({files:this.context.store.getState().fileReducer.content})
		}

		this.context.store.subscribe(()=>{
			// console.log(this.context.store.getState().fileReducer.content);
			if(!is(this.context.store.getState().fileReducer.content,this.state.files)){
				this.setState({files:this.context.store.getState().fileReducer.content})
				// console.log('???');
			}
			
		})
	}



	shouldComponentUpdate(nextProps = {}, nextState = {}){
  	const thisProps = this.props || {}, thisState = this.state || {};
  		if (thisState['search']!==nextState['search']) {
  			return true;
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
		// console.log('index绘制开始',this.state);
		var blocks=[];

		this.state.files.forEach((item,index)=>{
			blocks.push(<Block key={item['_id']} fileName={item.fileName} missionName={item.missionName} type={item.type} onClick={this.downLoad.bind(this)}></Block>)
		})

		this.context.store.dispatch(processAction(60))


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
					<input type='text' placeholder='搜索' value={this.state.search} onChange={this.handleChange.bind(this)}/>
					<button onClick={this.search.bind(this)}>Search</button>
				</span>
			</div>
			<div className='files' key='fileRoot' >
			<CSSTransitionGroup
          		transitionName="example"
          		transitionEnterTimeout={400}
          		transitionLeaveTimeout={300}>
				{blocks}
        	</CSSTransitionGroup>
			</div>
			</div>

	}
}


Index.contextTypes={
	store:React.PropTypes.object,
	ipc:React.PropTypes.object

}

export {Index}