var React=require('react')

import { is } from 'immutable';

class DownloadItem extends React.Component {
	constructor(args) {
		// code
		super(args)
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

		return <div className='downloadBlock'>
			<img alt='蛤蛤' src='./app/img/game.png'></img>
			<div>
				<h3>{this.props.name}</h3>
				<div className='downloadProcess'>
				<div style={{width:(this.props.completed%this.props.total)+'%'}}></div>
				</div>
				<p><span>{this.props.completed}</span>   of    <span>{this.props.total}</span></p>
				<span></span>
			</div>
		</div>

	}

	// methods
}

export {DownloadItem}