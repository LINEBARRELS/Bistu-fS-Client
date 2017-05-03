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
		this.piecesBelong={};

		this.fileName=parsedTorrent.files[0].name;
		this.creator=parsedTorrent.createdBy;
		this.total=parsedTorrent.length;
		this.pieceLength=parsedTorrent.pieceLength;
		this.last=parsedTorrent.lastPieceLength;

		this.pieceMessage={}

		this.limit=100;
		this.cur=0;
		this.on=0;
		this.searching=0;

		this.watcher=null,
		this.checker=null,

		fileMission[this.fileName]=this;

		so.emit('join',this.fileName)
	}

	// methods
	start(){
		this.watcher=setInterval(()=>{
		if(this.on<=this.limit&&this.cur!=this.pieceNum){
			var piece=this.filePieces.shift();
			this.cur =this.cur+1;

			this.piecesBelong[piece]=this.pieceMessage[piece]||null;

			if(!this.piecesBelong[piece]){
				console.log(piece,',没有文件持有者信息');
				// let upRange = (this.searching+100)>this.pieceNum?this.pieceNum:(this.searching+100),
				// 	searchPiece=this.recode.slice(this.searching,upRange);

				so.emit('pieceSearch',this.fileName,piece)
				this.filePieces.push(piece);
				this.cur =this.cur-1;
			}else{
				if (!peerConnectByUser[this.piecesBelong[piece]]) {
					peerConnectByUser[this.piecesBelong[piece]]=peer(this.piecesBelong[piece]);
					peerConnectByUser[this.piecesBelong[piece]].startOffer()
				}
			

				if(!peerConnectByUser[this.piecesBelong[piece]].temp[piece]){
      					peerConnectByUser[this.piecesBelong[piece]].temp[piece]=Buffer.allocUnsafe(0);
      					// console.log('接收方建立dc缓存');
      			}

				this.handle(piece)
			}//pieceHolder 
		}//first if
		}, 10);//watcher



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
		// }, 2000);//checker

	}//start




	handle(piece){
			var dc=peerConnectByUser[this.piecesBelong[piece]].pc.createDataChannel(piece);

			if(this.filePieces.length==0){
				dc.last=true;
			}

			dc.pieceLength=this.pieceLength;
			// this.pieces[piece]=this.creator;           //importent
			peerConnectByUser[this.piecesBelong[piece]].dc[piece]=dc;

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
              	peerConnectByUser[this.piecesBelong[piece]].temp[event.target.label]=Buffer.concat([peerConnectByUser[this.piecesBelong[piece]].temp[event.target.label],data])


              	var l=peerConnectByUser[this.piecesBelong[piece]].temp[event.target.label].length;
              	if (l==this.pieceLength||l==this.last) {

              	var position=this.recode.indexOf(event.target.label);
              	console.log(position);
               	ipc.send('fileArrive',this.fileName,position,peerConnectByUser[this.piecesBelong[piece]].temp[event.target.label],this.pieceLength)
               	// peerConnectByUser[this.creator].temp[event.target.label]=null;
               	console.log(l,'有新块下载');
               	dc.close();
               	peerConnectByUser[this.piecesBelong[piece]].dc[event.target.label]=null;
               	

            	}
			}.bind(this)//onmessage

			this.on =this.on+1;
	}//handle

	pause(){
		
		window.clearInterval(this.watcher);
	}
}

export {file}
