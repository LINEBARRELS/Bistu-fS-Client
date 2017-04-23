var React=require('react')

class Message extends React.Component {
	constructor(args) {
		super(args)
	}

	componentDidMount() {
		// this.context.store.subscribe(function(){
		// 	this.refs.icon.style.backgroundImage='url(./app/img/'+this.context.store.getState().cur+'.png)'
		// }.bind(this))
	}

	render(){
		return <div className='toast'>AWETGAWE</div>
	}
}

Message.contextTypes={
	store:React.PropTypes.object
}


export {Message}