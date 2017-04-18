var React=require('react')
var fs=require('fs')



class Upload extends React.Component {
	constructor(args) {
		super(args)
	}

	fileAl(e){
		e.preventDefault()
    	
    	var path=e.dataTransfer.files[0].path.split('\\').join('/');
    	var options={
    		createdBy:so.username,
    		pieceLength: 1048576
    	}
    	this.context.ipc.send('createT',path,options)


	}

	f(e){
		e.preventDefault();
		return false;
	}

	render(){
		return <div>
		<div onDrop={this.fileAl.bind(this)} 
		      style={{width:'200px',height:'200px',background:'blue'}}></div>
		</div>
	}
}

Upload.contextTypes={
	ipc:React.PropTypes.object,

}


export {Upload}