var fs=require('fs')
var electron= require('electron')
var ReactDOM=require('reactdom')


import {R} from "./component/app.js";


import {createStore} from "redux";
import {routerReducer} from "./component/Reducer/Router.js"

import {file} from './dist/file.js'

window.file=file;
var ipc =electron.ipcRenderer
var GG ='gw2gwe4'

var username=null

ipc.on('userinfo',function(event,arg) {
	console.log(arg);
	username=arg
	so.username=arg;
	so.emit('onLine',arg)
});

ipc.on('re',function(event,arg,name){

	fs.writeFileSync('../'+name+'.torrent',new Buffer(arg));
})

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



var store = createStore(routerReducer)
console.log(store);
ReactDOM.render(<R ipc={ipc} store={store} user={username}/>,layout)





