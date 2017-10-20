var React=require('react');


import {UnitItem} from './unitItem.js'



class Unit extends React.Component{
	constructor(){
		super();
		this.state={on:0};
	}

	renderItem(){
		let result=[]
		this.props.children.forEach((item,index)=>{
			let on=(index==this.state.on)?true:false;
			// item.props.key=index;
			let t=<UnitItem data={item.props.data} on={on} index={index}>{item.props.children}</UnitItem>
			result.push(t);
		});
		return result;
	}
	render(){
		let items=this.renderItem();
		return <div className='unit' onClick={(event)=>{
			if(event.target.classList[0]==='unit-item'){
				this.setState({on:event.target.dataset['id']});
				if(this.props.onItemClick){
					this.props.onItemClick.call(this,event,event.target.dataset['val']);
				}

			}
		}} id={this.props.id}>
		{items}</div>
	}
}


export {Unit}
