var React=require('react')
var fs=require('fs')



class Upload extends React.Component {
	constructor(args) {
		super(args)

		this.state={path:'',name:'',type:'',detail:''}

		this.handleDesc=this.handleDesc.bind(this)
	}

	fileSelect(e){
		e.preventDefault()
    	
    	var path=e.dataTransfer.files[0].path.split('\\').join('/');
    	// this.context.ipc.send('createT',path,options)
    	this.setState({path:path})
    	e.target.classList.add('active')
    	e.target.innerHTML='文件为'+path;


	}

	cancelFile(e){
		e.preventDefault()
		e.target.classList.remove('active')
		e.target.innerHTML='';
		this.setState({path:''})

		
	}

	handleDesc(e){
		const target = event.target;
    	const value = target.value;
    	const name = target.name;

    	this.setState({
      		[name]: value
    	});

    	
    	
	}

	submit(e){
		var options={
      		createdBy:username,
      		pieceLength: 262144,
      		comment:this.state.detail,
      		type:this.state.type
    	}
		this.context.ipc.send('createT',this.state,options)
	}

	componentDidMount(){
		this.context.ipc.on('torrentCreated',(data,name)=>{
			this.setState({path:'',name:'',type:'',detail:''});
			var myNotification = new Notification('种子生成完成', {
  			body: name+'种子生成完成,上传马上完成'
			})
		})
	}


	render(){


		return <div className='mainSection'>
		<div className='informationZone'>
			<span className='input'>
				<label for='missionName'>任务名</label>
				<input type='text'  id='missionName' name='name' onChange={this.handleDesc} placeholder='小于30个字符' value={this.state.name}/>
			</span>
			<span className='input'>
				<label>类型</label>
				<select name='type' onChange={this.handleDesc} value={this.state.type}>
					<option value='music'>音乐</option>
					<option value='movie'>电影</option>
					<option value='game'>游戏</option>
					<option value='doc'>文档</option>
					<option value='other'>其他</option>
				</select>
			</span>
			<span className='input'>
				<textarea name='detail' onChange={this.handleDesc} placeholder='简介,小于120' value={this.state.detail}></textarea>
			</span>
			<span className='input'>
				<button id='torrentSubmit' onClick={this.submit.bind(this)} >提交</button>
			</span>
		</div>
		<div className='dropZone' 
			onDrop={this.fileSelect.bind(this)} ></div>
		</div>
	}
}

Upload.contextTypes={
	ipc:React.PropTypes.object
}


export {Upload}