var React=require('react');



class PollBlock extends React.Component{
	render(){
		var cl='colum-item-inner '+this.props.className

		var img=this.props.img?this.props.img:('D:/frontEnd/Bistu-fS-Client/app/img/'+this.props.className+'.png')

		var style={
			background:'url('+img+')',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: '50%'
		}
		return <div className='column-item'>
		<div className={cl}>
		<div className='inner-icon' style={style}></div>
		<div className='inner-content'>
			<h3>{this.props.header}</h3>
			<p>{this.props.content}</p>
		</div>
		</div>
		</div>
	}
}


export {PollBlock}