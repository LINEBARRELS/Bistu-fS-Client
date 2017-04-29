var fs=require('fs')
var electron= require('electron')
var ReactDOM=require('reactdom')
var parse =require('parseT')


import {R} from "./component/app.js";


import {createStore} from "redux";
import {rootReducer} from "./component/Reducer/Root.js"

import {file} from './dist/file.js'

window.file=file;
var ipc =electron.ipcRenderer
var store = createStore(rootReducer)

window.store=store;



ipc.on('userinfo',function(event,arg) {
	console.log(arg);
	so.username=arg;
	so.emit('onLine',arg)
	ipc.send('so',so)
});

ipc.on('torrentCreated',function(event,torrent,fileName,missionName,fileType){

	fs.writeFileSync('./torrents/'+missionName+'.torrent',new Buffer(torrent));
	so.emit('torrent',{torrent:torrent,fileName:fileName,missionName:missionName,user:so.username,fileType:fileType})
	console.log(missionName,'种子生成完成,文件为',fileName);
})


ipc.on('fileWriteCom',(event,mess)=>{
	console.log(mess);
})//写文件完成

ipc.on('torrentBuffered', function(event,torrent) {
	console.log(torrent);
});







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




ReactDOM.render(<R ipc={ipc} store={store}/>,layout)





