var React= require('react');

class TopBar extends React.Component {
	constructor(props){
		super(props)

		// this.state={icon:'index'}

	}

	componentDidMount() {
		
		this.context.store.subscribe(function(){
			this.refs.icon.style.backgroundImage='url(./app/img/'+this.context.store.getState().cur+'.png)'
		}.bind(this))
   	}

	quit(){
		this.context.ipc.send('quit')
	}

	minmize(){
		this.context.ipc.send('mini')
	}
	render(){

		return <div>
		       <div className='drag'></div>
		       <span id='icon' ref='icon'></span>
               <span id='min' onClick={this.minmize.bind(this)}></span>
               <span id='close' onClick={this.quit.bind(this)}></span></div>
	}
}

TopBar.contextTypes={
	store:React.PropTypes.object,
	ipc:React.PropTypes.object
}

export {TopBar};