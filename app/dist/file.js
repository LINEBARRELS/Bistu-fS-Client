var parse =require('parse-torrent')
var fs=require('fs')



function file (torr){
	// constructor {
		// code
		var parsedTorrent=parse(torr);
		this.filePieces=parsedTorrent.pieces;
		this.recode=parsedTorrent.pieces.concat();
		this.pieceNum=parsedTorrent.pieces.length;
		this.piecesBelong={};

		this.status=false;

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
			st.fill(0);
			localStorage.setItem(this.hash,st);
			storage =st= null;
		}
		
		so.emit('join',this.hash)


		console.log(this.fileName+'mission init complete');

	// }		
}
	// methods
	file.prototype.start=function(){

		if(this.completed!==this.total){
		this.status=true;
		this.watcher=setInterval(()=>{
			console.log('hahahahahahaha')
		if(this.on<=this.limit&&this.cur!=this.pieceNum&&this.filePieces.length!=0){
			let piece=this.filePieces.shift();
			this.on=this.on+1;
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

		}, 10);//watcher
		}
	}//start

	file.prototype.updateMessage=function(pieceNum,holder){
		this.pieceMessage[this.recode[pieceNum]]=holder;
	}




	file.prototype.handle=function(piece,re){

			let dc=null;


			if(!re){

			if(!peerConnectByUser[this.piecesBelong[piece]].dc[piece]){
				dc=peerConnectByUser[this.piecesBelong[piece]].pc.createDataChannel(piece);

				peerConnectByUser[this.piecesBelong[piece]].dc[piece]=dc;
			}else{
				dc=peerConnectByUser[this.piecesBelong[piece]].dc[piece];
			}
			

			dc.pieceLength=this.pieceLength;

			}else if(re){
				this.completed=this.completed-peerConnectByUser[this.piecesBelong[piece]].temp[piece].length;
				// peerConnectByUser[this.piecesBelong[piece]].temp[piece]=Buffer.allocUnsafe(0);
				dc=peerConnectByUser[this.piecesBelong[piece]].pc.createDataChannel(piece);

				peerConnectByUser[this.piecesBelong[piece]].dc[piece]=dc;
				dc.pieceLength=this.pieceLength;
			}



			dc.onopen=function(eventO){
				// console.log(piece,'连接开始',eventO);
				console.log(piece+',连接开始');
				var tem=JSON.stringify({file:this.fileName,tl:this.total,piece:this.recode.indexOf(piece),length:this.pieceLength,hash:this.hash});
				eventO.currentTarget.send(tem);
				this.on=this.on-1;

			}.bind(this)

			dc.onmessage=function(event){

              		
              		var data=Buffer.from(event.data);
              		// console.log(data);
              		this.completed=this.completed + data.length;
              		peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label]=Buffer.concat([peerConnectByUser[this.piecesBelong[piece]].temp[event.target.label],data])

              		
              		

              		var l=peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label].length;
              		// console.log(l);


              		if (l==this.pieceLength||l==this.last) {

              			
              			console.log('完成度',this.completed);
              			
              			var com=false;
              			if(this.completed===this.total){
              				ipc.send('complete',this.fileName);
              				com=true
              				this.status=false;
              				// this.closeDc();
              			}
              			var position=this.recode.indexOf(event.target.label);

              			// console.log('接收方收到数据',position,peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label]);
              			console.log('第'+position+'个块长度完整',re?'被重新开始':'第一次开始');

              			// this.localR[position] = 1;
              			// localStorage.setItem(this.hash,this.localR)

               			ipc.send('fileArrive',this.fileName,position,peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label],this.pieceLength,com,this.hash)
               		// console.log(position,peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label],'有新块下载');
               			// dc.close();
               			dc.onmessage=null;
               			peerConnectByUser[this.piecesBelong[event.target.label]].temp[event.target.label]=null;
               			peerConnectByUser[this.piecesBelong[event.target.label]].dc[event.target.label]=null;


            		}//ok
			}.bind(this)//onmessage

			dc.onclose=function(e){
				console.log(e)
				if(peerConnectByUser[this.piecesBelong[e.target.label]].temp[e.target.label]){

					var p=peerConnectByUser[this.piecesBelong[e.target.label]];

					if(p.temp[e.target.label].length !== this.pieceLength&&p.temp[e.target.label].length !== this.last){
						this.completed=this.completed-peerConnectByUser[this.piecesBelong[e.target.label]].temp[e.target.label].length;
						peerConnectByUser[this.piecesBelong[e.target.label]].temp[e.target.label]=null;
					}
					
					//清除无用数据长度
				}
				
				
				peerConnectByUser[this.piecesBelong[event.target.label]].dc[event.target.label]=null;

				if(this.piecesBelong[event.target.label]==this.pieceMessage[event.target.label]){
					this.piecesBelong[event.target.label]=null;
					this.pieceMessage[event.target.label]=null;
				}else{
					this.piecesBelong[event.target.label]=null;
				}
				this.cur-=1;
				this.filePieces.push(piece);
			}.bind(this)
			// dc.onerror=function(e){
			// 	console.log(e)
			// 	this.completed=this.completed-peerConnectByUser[this.piecesBelong[e.target.label]].temp[e.target.label].length;
			// 	peerConnectByUser[this.piecesBelong[e.target.label]].temp[e.target.label]=null;
			// 	peerConnectByUser[this.piecesBelong[event.target.label]].dc[event.target.label]=null;

			// 	this.piecesBelong[event.target.label]=null;
			// 	this.filePieces.push(piece);
			// }


	}//handle


	file.prototype.closeDc=function(){
		for(let i in this.piecesBelong){
			if(peerConnectByUser[this.piecesBelong[i]].dc[i]){
				peerConnectByUser[this.piecesBelong[i]].dc[i].onmessage=null;
			}
			if(peerConnectByUser[this.piecesBelong[i]].temp[i]){
				peerConnectByUser[this.piecesBelong[i]].temp[i]=null;
			}
		}
	}

	file.prototype.pause=function(){
		this.status=false;
		clearInterval(this.watcher);
	}


