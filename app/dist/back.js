var fs=require('fs');
var electron= require('electron');
var ipc =electron.ipcRenderer;

var fileMission={};
var peerConnectByUser={};
var totalFile={};



ipc.on('socketInit', function(event,username,uid) {
	so.username=username;
	so.uid=uid;
	console.log(uid);
	so.emit('onLine',so.uid);
	
 	console.log(so.username,'init');
 	// ipc.send('roomInit',so.username)
 	let localCashe=[]
 	for(let i in localStorage){
 		localCashe.push(i)
 	}
 	localCashe.length===0?console.log('nothing to init!'):so.emit('join',localCashe)
});

// ipc.on('roomInited',function(event,files){
// 	so.emit('join',files)
// })

ipc.on('quit',function(event){
	so.disconnect();
})

ipc.on('search', function(event,search) {

  so.emit('search',search,so.uid);

});

ipc.on('searchType', function(event,search) {

  so.emit('searchType',search,so.uid);

});

ipc.on('downLoad', function(event,name) {

  so.emit('downLoad',name);

});

ipc.on('fileWriteCom', function(event,hash,posi) {

  fileMission[hash].localR[posi]=1;
  localStorage.setItem(hash,fileMission[hash].localR);

});

ipc.on('watchFm',function(event){
	// console.log('?>?????');
	ipc.send('fmReturn',fileMission)
})

ipc.on('triggle',function(event,name){
	if(fileMission[name]){
		fileMission[name].status?fileMission[name].pause():fileMission[name].start();
	}
	
})


ipc.on('torrentCreated',function(event,torrent,fileName,missionName,fileType,fileDetail,hash){

	fs.writeFileSync('./torrents/'+missionName+'.torrent',new Buffer(torrent));
	so.emit('torrent',{torrent:torrent,fileName:fileName,missionName:missionName,hash:hash,creator:so.uid,fileType:fileType,fileDetail:fileDetail});
	localStorage.setItem(hash,'allClean');
	console.log(missionName,'种子生成完成,文件为',fileName);
	so.emit('join',hash)

})

ipc.on('err',function(event,e,arg){
	console.log(e,arg);
})

