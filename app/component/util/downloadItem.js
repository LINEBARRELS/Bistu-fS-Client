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
		if(this.refs.speed){
		var speed=nextProps.completed-this.props.completed;
		
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

		var pro=this.props.completed/this.props.total;
		var icon=(pro===1)?(<span className='.over'></span>):(<span className='speed' ref='speed'>0m/s</span>);

		console.log('down render',this.props.name,this.props.status)
		return <div className={'downloadBlock'+(this.props.status?' on':'')} data-hash={this.props.hash} onDoubleClick={this.downloadTrigger.bind(this)}>
			<img alt='蛤蛤' src='./app/img/game.png'></img>
			<div>
				<h4>{this.props.name}</h4>
				<div className='downloadProcess'>
				<div style={{width:(pro*100)+'%'}}></div>
				</div>
				<p><span>{Bit(this.props.completed)}</span>   of    <span>{Bit(this.props.total)}</span>
				
				</p>
				{icon}
				
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