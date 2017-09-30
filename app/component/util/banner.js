var React=require('react');
var electron= require('electron');



var ipc =electron.ipcRenderer;


class Banner extends React.Component{
	render(){
		return <header className='banner' onClick={(event)=>{
			if(event.target.className=='banner-item'){
				ipc.send('searchByType',event.target.name)
			}
		}}>
			<div className='banner-item' name='hot'>
				<input type='radio' name='ban' id='hot'/>
				<label htmlFor='hot'>最新</label>
			</div>

			<div className='banner-item' name='music'>
				<input type='radio' name='ban' id='music'/>
				<label htmlFor='music'>音乐</label>
			</div>

			<div className='banner-item' name='movie'>
				<input type='radio' name='ban' id='movie'/>
				<label htmlFor='movie'>影视</label>
			</div>

			<div className='banner-item' name='game'>
				<input type='radio' name='ban' id='game'/>
				<label htmlFor='game'>游戏</label>
			</div>

			<div className='banner-item' name='doc'>
				<input type='radio' name='ban' id='doc'/>
				<label htmlFor='doc'>文档</label>
			</div>
			<button className='banner-fresh'></button>
		</header>
	}
}


export {Banner}