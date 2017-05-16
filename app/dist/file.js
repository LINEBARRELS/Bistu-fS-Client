var parse =require('parse-torrent')
var fs=require('fs')
// var electron =require('electron')
// const {electron} = require('electron')
// var peer =require('./peer.js')


function file (torr){
	// constructor {
		// code
		var parsedTorrent=parse(torr);
		this.filePieces=parsedTorrent.pieces;
		this.recode=parsedTorrent.pieces.concat();
		this.pieceNum=parsedTorrent.pieces.length;
		this.piecesBelong={};

		this.hash=parsedTorrent.infoHash;
		this.fileName=parsedTorrent.files[0].name;
		this.creator=parsedTorrent.createdBy;
		this.total=parsedTorrent.length;
		this.pieceLength=parsedTorrent.pieceLength;
		this.last=parsedTorrent.lastPieceLength;

		this.localR=new Array(this.pieceNum);

 		this.completed=0;


		this.pieceMessage={}

		this.downloading=[]


		this.limit=1000;
		this.cur=0;
		this.on=0;

		this.watcher=null,
		this.checker=null;

		fileMission[this.hash]=this;

		var storage=localStorage.getItem(this.hash);

		if(storage===null){
			var st=new Array(this.pieceNum);
			storage.fill(0);
			localStorage.setItem(this.hash,storage);
			storage = null;
		}
		
		so.emit('join',this.hash)


		console.log(this.fileName+'mission init complete');

	// }		
}
	// methods
	file.prototype.start=function(){
		this.watcher=setInterval(()=>{
		if(this.on<=this.limit&&this.cur!=this.pieceNum){
			let piece=this.filePieces.shift();
			this.cur =this.cur+1;

			this.piecesBelong[piece]=this.pieceMessage[piece]||null;

			if(!this.piecesBelong[piece]){
				// console.log(piece+',没有文件持有者信息');
				console.log(piece,',没有文件持有者信息')

				var p=this.recode.indexOf(piece);
				so.emit('pieceSearch',this.hash,this.fileName,p);
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
			// this.cons.send('message',peerConnectByUser)
		}, 10);//watcher



		this.checker=setInterval(()=>{
			if(this.cur===this.pieceNum){

				for(let i of this.recode){
					if(peerConnectByUser[this.piecesBelong[i]].temp[i].length===0){
						// console.log(i,'检测到部分异常');

						this.piecesBelong[i]=this.pieceMessage[i];
						if(!peerConnectByUser[this.piecesBelong[i]]){
							peerConnectByUser[this.piecesBelong[i]]=peer(this.piecesBelong[i]);
							peerConnectByUser[this.piecesBelong[i]].startOffer()
						}

						if(!peerConnectByUser[this.piecesBelong[i]].temp[i]){
      					peerConnectByUser[this.piecesBelong[i]].temp[i]=Buffer.allocUnsafe(0);
      					// console.log('接收方建立dc缓存');
      					}

      					if(peerConnectByUser[this.piecesBelong[i]].dc['test'].readyState==='open'){
      						this.handle(i);   
      					}
      					
					}
					
				}
			}
		}, 2000);//checker

	}//start

	file.prototype.updateMessage=function(pieceNum,holder){
		this.pieceMessage[this.recode[pieceNum]]=holder;
	}




	file.prototype.handle=function(piece){

			let dc=peerConnectByUser[this.piecesBelong[piece]].pc.createDataChannel(piece);



			dc.pieceLength=this.pieceLength;

			peerConnectByUser[this.piecesBelong[piece]].dc[piece]=dc;

			console.log(dc);


			dc.onopen=function(eventO){
				// console.log(piece,'连接开始',eventO);
				console.log(piece+',连接开始')
				var tem=JSON.stringify({file:this.fileName,piece:this.recode.indexOf(piece),length:this.pieceLength})
				eventO.currentTarget.send(tem);
				this.on=this.on-1;

			}.bind(this)

			dc.onmessage=function(event){

              		
              		var data=Buffer.from(event.data);
              		// console.log(data);
              		console.log('接收方收到数据',event.target.label);
              		peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label]=Buffer.concat([peerConnectByUser[this.piecesBelong[piece]].temp[event.target.label],data])

              		
              		console.log('完成度',this.completed);

              		var l=peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label].length;
              		console.log(l);


              		if (l==this.pieceLength||l==this.last) {

              		this.completed=this.completed + l;




              		if(this.completed===this.total){
              			ipc.send('complete',this.fileName);
              		}
              		var position=this.recode.indexOf(event.target.label);

              		this.localR[position] = 1;
              		localStorage.setItem(this.hash,this.localR)

               		ipc.send('fileArrive',this.fileName,position,peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label],this.pieceLength)
               		// console.log(position,peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label],'有新块下载');
               		dc.close();
               		// peerConnectByUser[this.piecesBelong[event.target.label]].dc[event.target.label]=null;
            		}
			}.bind(this)//onmessage

			this.on =this.on+1;


	}//handle

	file.prototype.pause=function(){
		
		clearInterval(this.watcher);
	}

// window.file=file;
// module.exports=file;
// export {file}
