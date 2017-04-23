var React=require('react')

class Block extends React.Component {
	constructor(args) {
		super(args)
	}

	render(){
		return <div className='block'>
			<span>{this.props.fileName}</span>
		</div>
	}
}

export {Block}