var React=require('react')

import { is } from 'immutable';

class DownloadItem extends React.Component {
	constructor(args) {
		// code
		super(args)
	}

	downloadTrigger(e){
		// if(e.target.className==='downloadBlock'){
			console.log(e.currentTarget);
			this.context.ipc.send('triggle',e.currentTarget.dataset.hash)
		
	}

	componentWillReceiveProps(nextProps){

		var speed=nextProps.completed-this.props.completed;
		if(speed!==0){
			this.refs.speed.innerHTML=BitbyM(speed) +'/s'
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

		console.log('down render',this.props.name)
		return <div className='downloadBlock' data-hash={this.props.hash} onDoubleClick={this.downloadTrigger.bind(this)}>
			<img alt='蛤蛤' src='./app/img/game.png'></img>
			<div>
				<h3>{this.props.name}</h3>
				<div className='downloadProcess'>
				<div style={{width:(this.props.completed/this.props.total*100)+'%'}}></div>
				</div>
				<p><span>{Bit(this.props.completed)}</span>   of    <span>{Bit(this.props.total)}</span></p>
				<span className='but'></span>
				<span className='speed' ref='speed'>0m/s</span>
			</div>
		</div>

	}

	// methods
}

DownloadItem.contextTypes={
	store:React.PropTypes.object,
	ipc:React.PropTypes.object
}

export {DownloadItem}