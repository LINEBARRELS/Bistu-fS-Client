var React=require('react')
var fs=require('fs')
import {file} from "../../dist/file.js";
import {Block} from "../util/block.js";

import {fileAction} from "../Action/Files.js";

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

	searchType(eve){
		console.log(eve.target);
		if(event.target.className==='types'){
			if(document.querySelector('.typeOn')){
				document.querySelector('.typeOn').classList.remove('typeOn')
			}
			eve.target.classList.add('typeOn')			
		}

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
		console.log(this.state.files);
		var blocks=[];

		this.state.files.forEach((item,index)=>{
			blocks.push(<Block key={index} fileName={item}></Block>)
		})


		return <div className='mainSection'>
			<div className='navBar'>
				<ul className='fileType' onClick={this.searchType.bind(this)}>
					<li className='types' ><a className='typeIcon'>音乐</a></li>
					<li className='types' ><a className='typeIcon'>电影</a></li>
					<li className='types' ><a className='typeIcon'>游戏</a></li>
					<li className='types' ><a className='typeIcon'>文档</a></li>
					<li className='types' ><a className='typeIcon'>其他</a></li>
				</ul>
				<span className='input'>
					<input type='text' placeholder='搜索' onChange={this.handleChange.bind(this)}/>
					<button onClick={this.search.bind(this)}>Search</button>
				</span>
			</div>
			<div className='files' key='fileRoot'>
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