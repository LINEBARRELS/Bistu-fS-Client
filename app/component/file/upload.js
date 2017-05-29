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


	}

	cancelFile(e){
		e.preventDefault()
		e.target.classList.remove('active')
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
      		pieceLength: 4194304,
      		comment:this.state.detail,
      		type:this.state.type
    	}
    	this.refs.submit.disabled=true;
    	console.log('????');
		this.context.ipc.send('createT',this.state,options)
	}

	componentDidMount(){
		this.context.ipc.on('torrentCreated',(data,name)=>{
			this.setState({path:'',name:'',type:'',detail:''});
			var myNotification = new Notification('种子生成完成', {
  			body: name+'种子生成完成,正在上传'
			})
		})
		this.refs.submit.disabled=true;

	}

	componentDidUpdate(){
		var s=this.state
		try{
		if(s.path&&s.name&&s.type){
			
			this.refs.submit.innerHTML='可提交';
			this.refs.submit.disabled=null;
			
		}else{
			var err=!s.path?'文件错误或空':null||!s.name?'任务名不科学':null||!s.type?'类型没选':null;
			console.log(err);
			this.refs.submit.disabled=true;
			throw err;
		}
		}catch(e){
			
			this.refs.submit.innerHTML=e;
		}
	}


	render(){


		return <div className='mainSection'>
		<div className='informationZone'>
			<span className='input'>
				<label for='missionName'>任务名</label>
				<input type='text'  id='missionName' name='name' onChange={this.handleDesc} maxLength="30" placeholder='小于30个字符' value={this.state.name}/>
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
				<textarea name='detail' onChange={this.handleDesc} placeholder='简介,小于120' maxLength="120" value={this.state.detail}></textarea>
			</span>
			<span className='input'>
				<button id='torrentSubmit' onClick={this.submit.bind(this)} ref='submit' >提交</button>
			</span>
		</div>
		<div className='dropZone' 
			onDrop={this.fileSelect.bind(this)} onClick={this.cancelFile.bind(this)}>{this.state.path}</div>
		</div>
	}
}

Upload.contextTypes={
	ipc:React.PropTypes.object
}


export {Upload}