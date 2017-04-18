var React=require('react')
var fs=require('fs')
import {file} from "../../dist/file.js";
class Index extends React.Component {
	constructor(args) {
		super(args)

		this.state={user:'',temp:null};
	}

	create(){
		this.state.temp=fs.readFileSync('.././Files/'+this.state.user);
	}

	start(e){
		// ipc.send('start',this.state.temp)
		// var fm=new file(this.state.temp)
		console.log(peerConnectByUser)
	}



	handleUser(e){
		this.setState({user: event.target.value});
	}

	
	render(){
		return <div>
		<div>
        <input type="text" value={this.state.user} onChange={this.handleUser.bind(this)}name="torr" id='torr' placeholder='输入种子名称'></input>
      	</div>
      	<div>
      	<button id='mission' onClick={this.create.bind(this)}>建立任务</button>
        <button id='send' onClick={this.start.bind(this)}>开始</button>
      	</div>

		</div>
	}
}


Index.contextTypes={
	ipc:React.PropTypes.object

}

export {Index}