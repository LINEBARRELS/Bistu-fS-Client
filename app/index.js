var fs=require('fs')
var electron= require('electron')
var ReactDOM=require('reactdom')
var parse =require('parseT')


import AppR from "./component/app.js";


import {createStore} from "redux";
import {rootReducer} from "./component/Reducer/Root.js";

import { Provider } from 'react-redux'

import {fileAction} from "./component/Action/Files.js";
import {fmUpdateAction} from "./component/Action/Missionupdate.js";

var mission={}

var ipc =electron.ipcRenderer;
var store = createStore(rootReducer);


window.st=store;


ipc.on('userinfo',function(event,user,uid) {
	console.log(uid);
	// window.so=so
	// so.username=arg;
	window.username=user;
	window.uid=uid;
	// so.emit('onLine',arg);
	// ipc.send('roomInit',so.username);
	// console.log(AppR)
	ReactDOM.render(<Provider store={store}>
    <AppR />
  </Provider>,layout);
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

window.BitbyM=function(num){

	return (num/1048576).toString().slice(0,5)+'MB'
}


ipc.on('fmReturn',(event,fm)=>{
	store.dispatch(fmUpdateAction(fm))
})


setInterval(()=>{
	ipc.send('watchFm');
}, 500);


ipc.on('searchResult',(event,data)=>{
	console.log('接收到搜索结果',data);
	store.dispatch(fileAction(data))
})


ipc.on('fileWriteCom',(event,mess,buf)=>{
	console.log(mess,buf);
})//写文件完成



ipc.on('message',(event,mess)=>{
	console.log(mess);
})

ipc.on('complete',(event,mess)=>{
	let myNotification = new Notification('文件下载完成', {
  		body: mess+' 文件下载完成,正在校验'
	})
})

ipc.on('torrentCreated',(event,torrent)=>{
	console.log(torrent)
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










