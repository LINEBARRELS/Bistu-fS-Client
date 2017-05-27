var React=require('react')


class Model extends React.Component {
	constructor(args) {
		super(args)
	}




	// methods
	render(){

        console.log(this.props);
		return <div>
		<div id='model' onClick={this.props.cancel}></div>
		<div onClick={this.props.ok} data-value={this.props.message}>
				{this.props.message}
		<p>开始下载?</p>
		</div>
		</div>
	}
}


export {Model}