var parse =require('parseT')
var fs=require('fs')
var electron =require('electron')

var ipc=electron.ipcRenderer


class file {
	constructor(torr) {
		// code
		var parsedTorrent=parse(torr);
		this.filePieces=parsedTorrent.pieces;
		this.recode=parsedTorrent.pieces.concat()
		this.pieces={};

		this.fileName=parsedTorrent.name
		this.creator=parsedTorrent.createdBy;
		this.total=parsedTorrent.length;
		this.pieceLength=parsedTorrent.pieceLength;
		this.last=parsedTorrent.lastPieceLength



		this.limit=20;
		this.cur=0;
		this.on=0;

		this.watcher=null;

		fileMission[parsedTorrent.name]=this;
	}

	// methods
	start(){
	this.watcher=setInterval(()=>{
		if(this.filePieces.length!=0){
			var piece=this.filePieces.shift()
			
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
			this.pieces[piece]=dc;
			peerConnectByUser[this.creator].dc[piece]=dc

			dc.onopen=function(event){
				console.log(piece,'连接开始');
				var tem=JSON.stringify({file:this.fileName,piece:piece,length:this.pieceLength})
				dc.send(tem)
				this.on=this.on-1;
			}.bind(this)

			dc.onmessage=function(event){

              	
              	var data=Buffer.from(event.data);
              	// console.log(data);
              	// console.log('接收方收到数据');
              	peerConnectByUser[this.creator].temp[event.target.label]=Buffer.concat([peerConnectByUser[this.creator].temp[event.target.label],data])


              	var l=peerConnectByUser[this.creator].temp[event.target.label].length
              	if (l==this.pieceLength||l==this.last) {

              	var position=this.recode.indexOf(event.target.label)
              	console.log(position);
               	// ipc.send('fileArrive',this.fileName,position,peerConnectByUser[this.creator].temp[event.target.label])
               	// peerConnectByUser[this.creator].temp[event.target.label]=null;
               	console.log(l,'有新块下载');
               	dc.close();
               	// peerConnectByUser[this.creator].dc[event.target.label]=null;
               	if(this.last==true){
               		this.pause()
               	}

            	}
			}.bind(this)//onmessage
			this.on =this.on+1;
			
		}
	}, 50);
	}

	pause(){
	window.clearInterval(this.watcher);
	}
}

export {file}
