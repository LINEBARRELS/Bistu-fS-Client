var React=require('react');



class PollBlock extends React.Component{
	render(){
		var cl='colum-item-inner '+this.props.className

		// var img=this.props.img?this.props.img:('D:/frontEnd/Bistu-fS-Client/app/img/'+this.props.className+'.png')

		return <div className='column-item'>
		<div className={cl}>
		<div className='inner-icon' ></div>
		<div className='inner-content'>
			<h3>{this.props.header}</h3>
			<p>{this.props.content}</p>
		</div>
		</div>
		</div>
	}
}


export {PollBlock}
