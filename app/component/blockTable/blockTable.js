var React=require('react');
var electron= require('electron');

class BlockTable extends React.Component{
	render(){
		console.log(this.props.tableData);
		return <div className='block-table'>
		{this.props.children}</div>
	}
}


export {BlockTable}