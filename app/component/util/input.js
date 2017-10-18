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

		var cl = 'input';
		var ph = this.props.placeholder?<label htmlFor={this.props.name}>{this.props.placeholder + ':'}</label>:null;

		if(this.props.button){
			cl=cl+' '+this.props.button
		}

		return <div className={cl} id={this.props.id}>
				{ph}
		<input type='text' onKeyDown={this.props.onKeyDown} onChange={this.props.onChange} onFocus={this.active.bind(this)} onBlur={this.recover.bind(this)}
			value={this.props.value} name={this.props.name} id={this.props.name}/>

		</div>
	}
}


export {Input}
