'use strict';

const electron = require('electron')
const fs=require('fs')
const {so} = require('socket.io-client')
// 控制应用生命周期的模块。
const {app} = electron
const {BrowserWindow} = electron
const {ipcMain} =electron
// const {ipc} = electron

// import {file} from './app/dist/file.js'
let mainWindow = null,
	login =null;

var createTorrent=require('create-torrent')

var temp={}

app.on('ready', function() {
	login=new BrowserWindow({
		transparent:true,
		frame:false,
		height:450,
		width:350
	})
	// login.openDevTools()
	login.loadURL('file://'+__dirname+'/login.html')
});

ipcMain.on('success',function(event,user){
	login.hide()
	mainWindow = new BrowserWindow({
    	// resizable:false,
    	transparent: true,
    	frame: false,
        height: 600,
        width: 800
    });
    mainWindow.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('userinfo',user)
  	})
  	mainWindow.show()
})

ipcMain.on('quit', function(event) {
	app.quit();
});

ipcMain.on('mini',function(event){
    mainWindow.minimize();
}) 

ipcMain.on('createT',function(event,args,opt){
    

  	createTorrent(args.path,opt,function(err,torrent){
  		if(!err){
        var tem=args.path.split('/');
        var name=tem.reverse()[0];
  			mainWindow.webContents.send('torrentCreated',torrent,name,args.name)
  		}else{
  			console.log(err);
  		}
  		
  	})
})



ipcMain.on('fileArrive', function(event,name,posi,file) {
  fs.appendFile('../rec/'+name, file, (err)=>{
  if(err){
  console.log(err);
  }
  console.log('file到达');
  });
  // if(!temp[name]){
  //   temp[name]=fs.openSync('../rec/'+name,'w+')
  // }
  // var buff=Buffer.from(file)

  // fs.write(temp[name],buff,0,buff.length,posi*buff.length,(err, written, buffer)=>{
  //   mainWindow.webContents.send('fileWriteCom',written)
  // })
});

