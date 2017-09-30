var React=require('react');


class Input extends React.Component{

	active(event){
		event.target.classList.add('on');
	}

	recover(event){
		if(event.target.value.length===0){
			event.target.classList.remove('on');
		}
	}

	render(){
		var cl=this.props.type=='dark'?'input input-dark':'input input-underline';
		var ph=this.props.dark?null:<i>{this.props.placeholder}</i>

		return <div className={cl} id={this.props.id}>
		<input type='text' onKeyDown={this.props.onKeyDown} onChange={this.props.onChange} onFocus={this.active.bind(this)} onBlur={this.recover.bind(this)}
			value={this.props.value} name={this.props.name}/>
		{ph}
		</div>
	}
}


export {Input}