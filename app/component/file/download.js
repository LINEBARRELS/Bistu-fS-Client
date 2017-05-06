var React=require('react')
// import {file} from "../../dist/file.js";
class Download extends React.Component {
	constructor(args) {
		super(args)
	}

	render(){
		return <div className='mainSection'>download</div>
	}
}

Download.contextTypes={
	ipc:React.PropTypes.object,

}
export {Download}