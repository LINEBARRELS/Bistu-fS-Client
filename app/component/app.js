var React=require('react')

import {Main} from "./Main.js";
import {Side} from "./Side.js";

class R extends React.Component {
	constructor(args) {
		super(args)
	}

	getChildContext() {
    	return {
    		store:this.props.store,
    		ipc:this.props.ipc
    	}
  	}

  	fa(e){
  		e.preventDefault();
  		return false
  	}

	// methods
	render(){
		console.log('store',this.props.store);
		return <div onDrop={this.fa}><Main /><Side /></div>
	}
}

R.childContextTypes = {
  store:React.PropTypes.object,
  ipc:React.PropTypes.object
};



export {R}