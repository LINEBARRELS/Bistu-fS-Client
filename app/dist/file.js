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

		this.downloading=[]

		this.limit=100;
		this.cur=0;
		this.on=0;

		this.watcher=null,
		this.checker=null;

		fileMission[this.fileName]=this;

		so.emit('join',this.fileName)
	}

	// methods
	start(){
		this.watcher=setInterval(()=>{
		if(this.on<=this.limit&&this.cur!=this.pieceNum){
			let piece=this.filePieces.shift();
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
					peerConnectByUser[this.piecesBelong[piece]].startOffer();
				}
			

				if(!peerConnectByUser[this.piecesBelong[piece]].temp[piece]){
      					peerConnectByUser[this.piecesBelong[piece]].temp[piece]=Buffer.allocUnsafe(0);
      					// console.log('接收方建立dc缓存');
      			}
      			console.log(peerConnectByUser[this.piecesBelong[piece]].pc.signalingState);

      			console.log(peerConnectByUser[this.piecesBelong[piece]].dc['test'].readyState);
      			
      			if(peerConnectByUser[this.piecesBelong[piece]].dc['test'].readyState==='open'){
      				this.handle(piece);   
      			}else{
      				this.filePieces.push(piece);
					this.cur =this.cur-1;
      			}
  
			}//pieceHolder 
		}//first if
		}, 10);//watcher


				


		this.checker=setInterval(()=>{
			if(this.cur===this.pieceNum){

				for(let i of this.recode){
					if(peerConnectByUser[this.piecesBelong[i]].temp[i].length===0){
						console.log(i,'检测到部分异常');
						this.piecesBelong[i]=this.pieceMessage[i];
						if(!peerConnectByUser[this.piecesBelong[i]]){
							peerConnectByUser[this.piecesBelong[i]]=peer(this.piecesBelong[i]);
							peerConnectByUser[this.piecesBelong[i]].startOffer()
						}

						if(!peerConnectByUser[this.piecesBelong[i]].temp[i]){
      					peerConnectByUser[this.piecesBelong[i]].temp[i]=Buffer.allocUnsafe(0);
      					// console.log('接收方建立dc缓存');
      					}


      					this.handle(i)
      					
					}
					
				}
			}
		}, 2000);//checker

	}//start




	handle(piece){

			let dc=peerConnectByUser[this.piecesBelong[piece]].pc.createDataChannel(piece);

			// if(this.filePieces.length==0){
			// 	dc.last=true;
			// }

			dc.pieceLength=this.pieceLength;
			// this.pieces[piece]=this.creator;           //importent
			peerConnectByUser[this.piecesBelong[piece]].dc[piece]=dc;

			console.log(dc);


			dc.onopen=function(eventO){
				console.log(piece,'连接开始',eventO);
				
				var tem=JSON.stringify({file:this.fileName,piece:this.recode.indexOf(piece),length:this.pieceLength})
				eventO.currentTarget.send(tem);
				this.on=this.on-1;

			}.bind(this)

			dc.onmessage=function(event){

              		
              		var data=Buffer.from(event.data);
              		// console.log(data);
              		console.log('接收方收到数据',event);
              		peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label]=Buffer.concat([peerConnectByUser[this.piecesBelong[piece]].temp[event.target.label],data])


              		var l=peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label].length;
              		console.log(l);
              		if (l==this.pieceLength||l==this.last) {

              		var position=this.recode.indexOf(event.target.label);

               		ipc.send('fileArrive',this.fileName,position,peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label],this.pieceLength)
               		console.log(position,l,'有新块下载');
               		event.currentTarget.close();
               		// peerConnectByUser[this.piecesBelong[event.target.label]].dc[event.target.label]=null;
            		}
			}.bind(this)//onmessage

			this.on =this.on+1;


	}//handle

	pause(){
		
		window.clearInterval(this.watcher);
	}
}

export {file}
