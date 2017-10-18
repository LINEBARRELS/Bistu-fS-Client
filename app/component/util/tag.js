var React=require('react');


import {Input} from './input.js'
import { Map, List,is } from 'immutable';

import { CSSTransitionGroup } from 'transitionGroup'


class Tag extends React.Component{
	constructor(){
		super();
		this.state={tags:List([]),addition:''}
	}




	componentDidUpdate(){
		// this.props.onChange.call()
	}

	removeTag(event){
		let index=event.target.dataset['index']

		let t = this.state.tags.remove(index);
		this.setState({tags : t});
		this.props.onChange(t.toJS());
	}

	addTag(){

		// console.log(this.state.push(123))
		var uni=this.state.tags.keyOf(this.state.addition)
		if(uni===undefined&&this.state.addition!==''){
			let t = this.state.tags.push(this.state.addition);
			this.setState({tags:t,addition:''});
			this.props.onChange(t.toJS());			
		}

		
	}



	render(){
		let content=this.state.tags.toJS();
		let result=[]
		content.forEach((item,index)=>{
			result.push(<div className='tag' key={index} data-index={index} onClick={this.removeTag.bind(this)}>{item}</div>)
		})

		return <div className='tag-container'>
			<div className='content'>
	  	<CSSTransitionGroup
          transitionName="tagAni"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}>
			{result}
        </CSSTransitionGroup>
			</div>
			<div className='add-content'>
			<Input placeholder='标签' onChange={(event)=>{
				this.setState({addition:event.target.value})
			}} value={this.state.addition} button='right'/>
			<div className='tag' onClick={this.addTag.bind(this)}>添加Tag!</div>
			</div>
		</div>
	}
}



export {Tag}