var React = require('react');

class List extends React.Component {
	constructor(args) {
		super(args)
	}

	render(){

		var nav=[];

        this.props.items.forEach((item,index)=>{
            nav.push(<li className={this.props.itemClass} 
            			 onClick={this.props.event.Click} 
            			 onMouseEnter={this.props.event.MouseEnter} 
            			 onMouseOut={this.props.event.MouseOut}>{item}</li>)
        })



		return <ul className={this.props.ulClass}>{nav}</ul>
	}

	// methods
}

export {List}