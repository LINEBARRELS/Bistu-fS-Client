var React=require('react');



class Loader extends React.Component{
	render(){

		let dis=this.props.on?'flex':'none'
		let st={
			display:dis
		}


		return <div className='veil' style={st}>
			<p>loading...</p>
		</div>
	}
}




export {Loader}