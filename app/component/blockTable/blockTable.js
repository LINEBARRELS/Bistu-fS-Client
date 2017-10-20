var React=require('react');
var electron= require('electron');

class BlockTable extends React.Component{
	render(){
		let header = [];

		for (let i  of this.props.title) {
				header.push(<div>{i}</div>)
		}
		return <div className='block-table'>
		<div className='block-title'>{header}</div>
		{this.props.children}</div>
	}
}


export {BlockTable}
