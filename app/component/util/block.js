var React=require('react')

import { is } from 'immutable';

class Block extends React.Component {
	constructor(args) {
		super(args)
	}



	trigger(e){

		if(this.refs.pic.clientHeight > 0){
			this.refs.block.classList.add('on')
		}else{
			this.refs.block.classList.remove('on')
		}
	}

	shouldComponentUpdate(nextProps = {}, nextState = {}){
  		const thisProps = this.props || {};


  		if (Object.keys(thisProps).length !== Object.keys(nextProps).length){
    		return true;
  		}

  		for (const key in nextProps) {
    		if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
      		return true;
    		}
  		}		

  		return false;
	}

	render(){
		return <div className='block' ref='block'>
			<div ref='pic' onClick={this.trigger.bind(this)} className={this.props.type+'icon'}></div>
			<span >{this.props.missionName}</span>
			<h4 onClick={this.trigger.bind(this)}>{this.props.fileName}</h4>
			<small>{this.props.type}</small>
			<p>{this.props.detail}</p>
			<span className='more' data-value={this.props.hash} onClick={this.props.onClick}></span>
		</div>
	}
}

export {Block}