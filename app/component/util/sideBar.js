var React=require('react');

class SideBar extends React.Component{


	render(){
		

		var cl=this.props.visiable?this.props.className+' visiable':this.props.className;

		for(let i of this.props.children){
			if(i.props.data===this.props.active){
				i.props.className='side-item item-active';
			}else{
				i.props.className='side-item';
			}
		}
		return <div className={cl} onClick={(event)=>{
			let item=Array.prototype.indexOf.call(event.target.classList,'side-item')
			if(item!==-1){
				this.props.itemEvent(event.target.dataset["stand"])
			}
		}}>
		<div id='logo'>fs client</div>
		{this.props.children}</div>
	}
}



export {SideBar};