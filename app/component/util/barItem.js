var React=require('react');


class SideBarItem extends React.Component{


	render(){
		return <div data-stand={this.props.data} className={this.props.className} >
		<img src={this.props.img}></img>
		{this.props.disc}</div>
	}
}

export {SideBarItem}