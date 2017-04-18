var React= require('react');

import {TopBar} from "./topBar/topBar.js";
import {pageAction} from "./Action/Page.js"
import {List} from "./util/list.js"

class Side extends React.Component {
	constructor(args){
		super(args)

		this.changePage=this.changePage.bind(this)
	}
	changePage(event){
		// console.log(event.target);
		this.context.store.dispatch(pageAction(event.target.innerHTML))
		if(document.querySelector('.sideItem.on')){
			document.querySelector('.sideItem.on').classList.remove('on')
		}
		
		event.target.classList.add('on')
	}

	render(){

		var items=['index','download','upload','user'],
		    itemClass='sideItem',
		    ulClass='sideBar';
		var events={
			Click:this.changePage,
			MouseEnter:null,
			MouseOut:null
		}
		return (<div id='side'>
			    <TopBar />
			    <List items={items} itemClass={itemClass} ulClass={ulClass} event={events}/>
		       </div>)
	}
}

Side.contextTypes={
	store:React.PropTypes.object
}

export {Side};