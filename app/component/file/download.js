var React=require('react')
// import {file} from "../../dist/file.js";
class Download extends React.Component {
	constructor(args) {
		super(args)
	}

	render(){
		return <div className='mainSection'>
		<div className='downloadBlock'>
			<img alt='蛤蛤' src='./app/img/game.png'></img>
			<div>
				<h3>Nobu.jpg</h3>
				<div className='downloadProcess'>
				<div></div>
				</div>
				<p><span>100M</span>   of    <span>1244M</span></p>
				<span></span>
			</div>
		</div>
		<div className='downloadBlock'>
			<img alt='蛤蛤' src='./app/img/movie.png'></img>
			<div></div>
		</div>
		<div className='downloadBlock'>
			<img alt='蛤蛤' src='./app/img/music.png'></img>
			<div></div>
		</div>
		<div className='downloadBlock'>
			<img alt='蛤蛤' src='./app/img/doc.png'></img>
			<div></div>
		</div>
		<div className='downloadBlock'>
			<img alt='蛤蛤' src='./app/img/other.png'></img>
			<div></div>
		</div>
		</div>
	}
}

Download.contextTypes={
	ipc:React.PropTypes.object,

}
export {Download}