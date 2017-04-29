var React=require('react')

class Block extends React.Component {
	constructor(args) {
		super(args)
	}

	detail(e){
		console.log(this.refs.pic);
	}



	render(){
		return <div className='block' >
			<div ref='pic' onClick={this.detail.bind(this)}></div>
			<span onClick={this.props.onClick} data-value={this.props.missionName}>{this.props.missionName}</span>
			<h4>{this.props.fileName}</h4>
			<small>{this.props.type}</small>
			<span className='more' ></span>
		</div>
	}
}

export {Block}