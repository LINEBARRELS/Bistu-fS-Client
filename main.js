'use strict';

const electron = require('electron');
const fs=require('fs')
const event=require('events')
// const {so} = require('socket.io-client')
const parse = require('parse-torrent');
// 控制应用生命周期的模块。
const {app} = electron;
const {BrowserWindow} = electron;
const {ipcMain} =electron;
// const {ipc} = electron

var io=require('socket.io-client')

let mainWindow = null,
	login =null;

var createTorrent=require('create-torrent');

var file=require('./app/dist/file.js')

var piece_message = {};
var temp={};


var fileMission={};
var peerConnectByUser={};
var so=null;

var eventCore=new event();

app.on('ready', function() {
	login=new BrowserWindow({
		transparent:true,
		frame:false,
		height:450,
		width:350
	})
	// login.openDevTools()
	login.loadURL('file://'+__dirname+'/login.html');
});

ipcMain.on('success',function(event,user){
	login.hide();
	mainWindow = new BrowserWindow({
    	// resizable:false,
    	transparent: true,
    	frame: false,
        height: 600,
        width: 800
    });
    mainWindow.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    so=io.connect('http://10.16.66.85:8080');

    so.username=user
    /////////////////////////////////////////////////////////////////////

    so.on('icecandidate',  function(data) {
      peerConnectByUser[data.from].addCandidate(data.candidate)
      // console.log('new candicate!');
    });

    so.on('newOffer', function(data) {

      if (!peerConnectByUser[data.from]) {
        console.log('无现有peerconnection 创建');
        peerConnectByUser[data.from]=peer(data.from)
      }
  

      peerConnectByUser[data.from].setRomote(data.sdp,data.from)

      peerConnectByUser[data.from].answer();

    });

    so.on('answered', function(data) {

      peerConnectByUser[data.from].setRomote(data.sdp,data.from)

    });

    so.on('roommess', function(data) {
      console.log(data.from);
    });

    so.on('torrentArrive',function(data){
      new file(Buffer.from(data),fileMission,so)
    });

    so.on('broadcast',function(data){
      console.log('someone if searching for:'+data.file,data.piece)
      so.emit('pieceSearch_Result',{file:data.file,piece:data.piece,holder:so.username})
    });

    so.on('rrr',function(data){
      console.log(data);
    });


    so.on('pieceUpdate', function(data) {
      // ipc.send('pieceMessage',data.file,data.piece,data.holder)
      console.log('有块请求被回应');
      fileMission[data.file].pieceMessage[data.piece]=data.holder
    });

    so.on('searchResult',  function(data) {
      mainWindow.webContents.send('searchResult',data);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////
    mainWindow.webContents.on('did-finish-load', function () {

    mainWindow.webContents.send('userinfo',user,so);
    so.emit('onLine',user);
  	});
  	mainWindow.show()
});//


ipcMain.on('quit', function(event) {
	app.quit();
});

ipcMain.on('mini',function(event){
    mainWindow.minimize();
});

ipcMain.on('createT',function(event,args,opt){
    

  	createTorrent(args.path,opt,function(err,torrent){
  		if(!err){
        var tem=args.path.split('/');
        var name=tem.reverse()[0];
  			mainWindow.webContents.send('torrentCreated',torrent,name,args.name,args.type)
        so.emit('torrent',{torrent:torrent,fileName:name,missionName:args.name,user:so.username,fileType:args.type});
  		}else{
  			console.log(err);
  		}
  		
  	});
});


ipcMain.on('roomInit',function(event,name) {
  fs.readdir('../Files', function(err,files){
    // mainWindow.webContents.send('fileList',files);
    so.emit('join',files)
  });
});

eventCore.on('fileArrive', function(name,posi,file,length) {
  // fs.appendFile('../rec/'+name, file, (err)=>{
  // if(err){
  // console.log(err);
  // }
  // console.log('file到达');
  // });
  if(!temp[name]){
    temp[name]=fs.openSync('../rec/'+name,'w+');
  }
  // var buff=Buffer.from(file)

  fs.write(temp[name],file,0,file.length,posi*length,(err, written, buffer)=>{
    mainWindow.webContents.send('fileWriteCom',written);
  })
});

////////////////////////////////////////////////////////////
ipcMain.on('search', function(event,search) {

  so.emit('search',search);
});

ipcMain.on('searchType', function(event,search) {
  so.emit('searchType',search);

});

ipcMain.on('downLoad', function(event,name) {
  so.emit('downLoad',name);

});

ipcMain.on('addSoEvent',function(event,name,callback){
  so.on(name,callback);
})

ipcMain.on('watchMs',function(event){
  mainWindow.webContents.send('msResult',fileMission)
})

ipcMain.on('watchPeer',function(event){
  mainWindow.webContents.send('peerResult',peerConnectByUser)
})

