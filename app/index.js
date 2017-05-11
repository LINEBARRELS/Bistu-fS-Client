var fs=require('fs')
var electron= require('electron')
var ReactDOM=require('reactdom')
var parse =require('parseT')


import {R} from "./component/app.js";


import {createStore} from "redux";
import {rootReducer} from "./component/Reducer/Root.js";

// import {file} from './dist/file.js';
var mission={}
// window.file=file;
var ipc =electron.ipcRenderer;
var store = createStore(rootReducer);

// window.store=store;
// window.ipc =ipc;

window.t_fm=233;


ipc.on('userinfo',function(event,arg) {
	console.log(arg);
	// window.so=so
	// so.username=arg;
	window.username=arg
	// so.emit('onLine',arg);
	// ipc.send('roomInit',so.username)

	ReactDOM.render(<R ipc={ipc} store={store}/>,layout);
});

window.Bit=function(num){
	if(num<1048576){

		return (num/1024).toString().slice(0,5)+'KB'
	}else if(num<1073741824){

		return (num/1048576).toString().slice(0,5)+'MB'
	}else{

		return (num/1073741824).toString().slice(0,5)+'GB'
	}

}

ipc.on('fileWriteCom',(event,mess)=>{
	console.log(mess);
})//写文件完成



ipc.on('message',(event,mess)=>{
	console.log(mess);
})

ipc.on('complete',(event,mess)=>{
	let myNotification = new Notification('文件下载完成', {
  		body: mess+' 文件下载完成,正在校验'
	})
})



window.ondrop=function(e){
	try{
	e.preventDefault(); 
	return false;
	}catch(e){
	console.log(e);
}
}
window.ondragover=function(e){
	try{
	e.preventDefault(); 
	return false;
	}catch(e){
	console.log(e);
	}
}










