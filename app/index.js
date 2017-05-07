var fs=require('fs')
var electron= require('electron')
var ReactDOM=require('reactdom')
var parse =require('parseT')


import {R} from "./component/app.js";


import {createStore} from "redux";
import {rootReducer} from "./component/Reducer/Root.js";

// import {file} from './dist/file.js';

// window.file=file;
var ipc =electron.ipcRenderer;
var store = createStore(rootReducer);

window.store=store;
window.ipc =ipc;


ipc.on('userinfo',function(event,arg) {
	console.log(arg);
	// window.so=so
	// so.username=arg;
	window.username=arg
	// so.emit('onLine',arg);
	// ipc.send('roomInit',so.username)

	ReactDOM.render(<R ipc={ipc} store={store}/>,layout);
});




ipc.on('fileWriteCom',(event,mess)=>{
	console.log(mess);
})//写文件完成



ipc.on('message',(event,mess)=>{
	console.log(mess);
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










