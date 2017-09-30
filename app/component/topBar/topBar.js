var React= require('react');
var electron= require('electron');



var ipc =electron.ipcRenderer;


class TopBar extends React.Component {
	constructor(props){
		super(props)

		// this.state={icon:'index'}

	}


	quit(){
		ipc.send('quit');
	}

	minmize(){
		ipc.send('mini');
	}
	render(){

		var current_page=this.props.cur;

		var logo_img=<img src={'D:/frontEnd/Bistu-fS-Client/app/img/'+current_page+'.png'}/>
		return <div className='app-bar'>

			{this.props.children}
			<div className='top-container'>
				<div className='top-item min' onClick={this.minmize.bind(this)}><div></div></div>
				<div className='top-item close' onClick={this.quit.bind(this)}><div></div></div>
			</div>
		</div>
	}
}



export {TopBar};


// <div className='logo' onClick={this.props.onLogoClick}>
// 	{logo_img}
// </div>