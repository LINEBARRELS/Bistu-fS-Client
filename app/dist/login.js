var electron= require('electron')

var ipc=electron.ipcRenderer;

var login=document.querySelectorAll('.button')[0],
	regist=document.querySelectorAll('.button')[1],
	close=document.querySelector('#close'),
	user=document.querySelectorAll('.loginInput')[0],
	pass=document.querySelectorAll('.loginInput')[1]

login.addEventListener('click',  function(event) {
	event.preventDefault();
	// ipc.send('success','zero')
	var head=new Headers()
	head.set('username',user.value);
	head.set('password',pass.value);
	fetch("http://192.168.1.103:8080/login",{
	method:'post',
	headers:head
	}).then(
    	function(response){
        	if(response.status!==200){
            	console.log("存在一个问题，状态码为："+response.status);
            	return;
        	}
        //检查响应文本
        	response.json().then(function(data){
            	if (data.loginResult==='success'){
            		ipc.send('success',user.value)
            	}else{
            		alert('你个傻吊 登录错误\n你个傻吊 登录错误\n你个傻吊 登录错误\n你个傻吊 登录错误\n')
            	}
        	});
    	}
	)
	.catch(function(err){
    	console.log("Fetch错误:"+err);
	});
});

regist.addEventListener('click',  function(event) {
	event.preventDefault();
	// ipc.send('success','zero')
	var head=new Headers()
	head.set('username',user.value);
	head.set('password',pass.value);
	fetch("http:// 192.168.1.103:8080/reg",{
	method:'post',
	headers:head
	}).then(
    	function(response){
        	if(response.status!==200){
            	console.log("存在一个问题，状态码为："+response.status);
            	return;
        	}
        //检查响应文本
        	response.json().then(function(data){
            	if (data.registResult==='success'){
            		alert('注册成功~')
            	}else{
            		alert('注册失败')
            	}
        	});
    	}
	)
	.catch(function(err){
    	console.log("Fetch错误:"+err);
	});
});



close.addEventListener('click',function(event){
	ipc.send('quit')
})


// var form = new FormData();
// form.append('username',123);
// form.append('password',123);
