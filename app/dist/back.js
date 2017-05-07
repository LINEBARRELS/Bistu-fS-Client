var fs=require('fs');
var electron= require('electron');
var ipc =electron.ipcRenderer;

var fileMission={};
var peerConnectByUser={};



ipc.on('socketInit', function(event,username) {
	so.username=username
	so.emit('onLine',so.username);
	
 	console.log(so.username,'init');
 	ipc.send('roomInit',so.username)
});

ipc.on('roomInited',function(event,files){
	so.emit('join',files)
})

ipc.on('quit',function(event){
	so.disconnect();
})

ipc.on('search', function(event,search) {

  so.emit('search',search);

});

ipc.on('searchType', function(event,search) {

  so.emit('searchType',search);

});

ipc.on('downLoad', function(event,name) {

  so.emit('downLoad',name);

});


ipc.on('torrentCreated',function(event,torrent,fileName,missionName,fileType){

	fs.writeFileSync('./torrents/'+missionName+'.torrent',new Buffer(torrent));
	so.emit('torrent',{torrent:torrent,fileName:fileName,missionName:missionName,user:so.username,fileType:fileType});
	console.log(missionName,'种子生成完成,文件为',fileName);
})