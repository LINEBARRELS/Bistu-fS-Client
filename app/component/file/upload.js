var React=require('react')
var fs=require('fs')



class Upload extends React.Component {
	constructor(args) {
		super(args)

		this.state={path:''}
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
		return <div className='mainSection'>
		<div className='informationZone'>
			<input name='name' className='info'/>
		</div>
		<div className='dropZone' 
			onDrop={this.fileAl.bind(this)}></div>
		</div>
	}
}

Upload.contextTypes={
	ipc:React.PropTypes.object
}


export {Upload}