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
    login.disabled=true;
	var head=new Headers()
	head.set('username',user.value);
	head.set('password',pass.value);

    fetch("http://10.3.137.157:8080/login",{
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
            		ipc.send('success',user.value,data.uid)
            	}else{
            		alert('登录失败')
                    login.disabled=false;
            	}
        	})
    	},function(reject){
            throw reject
        }
	)
	.catch(function(err){
    	console.log("Fetch错误:"+err);
	});

});

regist.addEventListener('click',  function(event) {
	event.preventDefault();
	// ipc.send('success','zero')
    regist.disabled=true;
	var head=new Headers()
	head.set('username',user.value);
	head.set('password',pass.value);
	fetch("http://10.3.137.157:8080/reg",{
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
                    regist.disabled=false;
            	}else{
            		alert('注册失败');
                    regist.disabled=false;
            	}
        	})
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
