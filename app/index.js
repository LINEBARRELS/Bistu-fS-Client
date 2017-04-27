var fs=require('fs')
var electron= require('electron')
var ReactDOM=require('reactdom')


import {R} from "./component/app.js";


import {createStore} from "redux";
import {rootReducer} from "./component/Reducer/Root.js"

import {file} from './dist/file.js'

window.file=file;
var ipc =electron.ipcRenderer
var store = createStore(rootReducer)

window.store=store;

var username=null

ipc.on('userinfo',function(event,arg) {
	console.log(arg);
	username=arg
	so.username=arg;
	so.emit('onLine',arg)
});

ipc.on('torrentCreated',function(event,torrent,fileName,missionName){

	fs.writeFileSync('./torrents/'+missionName+'.torrent',new Buffer(torrent));
	so.emit('torrent',{torrent:torrent,fileName:fileName,missionName:missionName,user:so.username})
	console.log(missionName,'种子生成完成,文件为',fileName);
})

ipc.on('fileWriteCom',(event,mess)=>{
	console.log(mess);
})

// so.on('message',  function(data) {
//   	store.dispatch()
// });

// var enter = document.querySelector('#enter'),
//     send = document.querySelector('#send'),
//     start=document.querySelector('#filestart'),
//     layout=document.querySelector('#layout')

// console.log(Main,Side,'ream');
// console.log(__dirname,'dir');

window.ondrop=function(e){
	try{
	e.preventDefault(); return false
	}catch(e){
	console.log(e);
}
}
window.ondragover=function(e){
	try{
	e.preventDefault(); return false
	}catch(e){
	console.log(e);
}
}




ReactDOM.render(<R ipc={ipc} store={store} user={username}/>,layout)





