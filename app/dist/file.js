var parse =require('parseT')
var fs=require('fs')
var electron =require('electron')

var ipc=electron.ipcRenderer


class file {
	constructor(torr) {
		// code
		var parsedTorrent=parse(torr);
		this.filePieces=parsedTorrent.pieces;
		this.recode=parsedTorrent.pieces.concat();
		this.pieceNum=parsedTorrent.pieces.length;
		this.pieces={};

		this.fileName=parsedTorrent.files[0].name;
		this.creator=parsedTorrent.createdBy;
		this.total=parsedTorrent.length;
		this.pieceLength=parsedTorrent.pieceLength;
		this.last=parsedTorrent.lastPieceLength;



		this.limit=100;
		this.cur=0;
		this.on=0;

		this.watcher=null;

		fileMission[this.fileName]=this;
	}

	// methods
	start(){
	this.watcher=setInterval(()=>{
		if(this.on<=this.limit&&this.filePieces.length!=0){
			var piece=this.filePieces.shift();
			this.cur =this.cur+1;
			// console.log(piece);
			if (!peerConnectByUser[this.creator]) {
				peerConnectByUser[this.creator]=peer(this.creator);
				peerConnectByUser[this.creator].startOffer()
			}
			

			if(!peerConnectByUser[this.creator].temp[piece]){
      				peerConnectByUser[this.creator].temp[piece]=Buffer.allocUnsafe(0);
      				// console.log('接收方建立dc缓存');
      		}

			var dc=peerConnectByUser[this.creator].pc.createDataChannel(piece);

			if(this.filePieces.length==0){
				dc.last=true;
			}

			dc.pieceLength=this.pieceLength;
			this.pieces[piece]=this.creator;
			peerConnectByUser[this.creator].dc[piece]=dc;

			dc.onopen=function(event){
				console.log(piece,'连接开始');
				
				var tem=JSON.stringify({file:this.fileName,piece:this.recode.indexOf(piece),length:this.pieceLength})
				dc.send(tem);
				this.on=this.on-1;
			}.bind(this)

			dc.onmessage=function(event){

              	
              	var data=Buffer.from(event.data);
              	// console.log(data);
              	console.log('接收方收到数据');
              	peerConnectByUser[this.creator].temp[event.target.label]=Buffer.concat([peerConnectByUser[this.creator].temp[event.target.label],data])


              	var l=peerConnectByUser[this.creator].temp[event.target.label].length;
              	if (l==this.pieceLength||l==this.last) {

              	var position=this.recode.indexOf(event.target.label);
              	console.log(position);
               	ipc.send('fileArrive',this.fileName,position,peerConnectByUser[this.creator].temp[event.target.label])
               	// peerConnectByUser[this.creator].temp[event.target.label]=null;
               	console.log(l,'有新块下载');
               	// dc.close();
               	// peerConnectByUser[this.creator].dc[event.target.label]=null;
               	

            	}
			}.bind(this)//onmessage

			this.on =this.on+1;
			
		}
	}, 50);//watcher

	// this.checker=setInterval(()=>{
	// 	if(this.cur===this.pieceNum){
	// 		for(let i in this.pieces){
	// 			if(peerConnectByUser[fm.pieces[i]].temp[i].length===0){
	// 				console.log('检测到部分异常');
	// 				var tem=JSON.stringify({file:this.fileName,piece:i,length:this.pieceLength})
	// 				peerConnectByUser[fm.pieces[i]].dc[i].send(tem)
	// 			}
	// 		}
	// 	}
	// }, 2000);
	}//start

	pause(){
	window.clearInterval(this.watcher);
	}
}

export {file}
