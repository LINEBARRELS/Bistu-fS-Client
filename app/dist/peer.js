(function(global){

	var configuration = {
   	'iceServers': [{
    	 'url': 'stun:stun.l.google.com:19302'
   	}]
  	};

  	var peer=function(remote){
    	return new peer.fn.init(remote);
  	}

	peer.fn=peer.prototype={
  		constructor:peer,
  		init:function(remote){
        	this.roId=remote;
			    this.pc= new webkitRTCPeerConnection(null);
        	this.dc={};
        	this.temp={}
        	this.pieceLen=length

        	this.pc.negoState = false;
        	

   			this.pc.onicecandidate = function (evt) {
   				


     			if (evt.candidate){
     				so.emit('candidate',{
         			'candidate': evt.candidate,
         			'to':this.roId,
         			'from':so.username
       				});
                    
                    
       				console.log('candidate');
     			} 
     			
   			}.bind(this);



   			this.pc.ondatachannel = function(event) {
      			receiveChannel = event.channel;
      			console.log('data!');

      			receiveChannel.onmessage = function(event) {
              var pd=JSON.parse(event.data)
      			 if (pd.file) {
                // console.log('发送方收到收据');
                // console.log(event);
                // if(!this.t){
                //   this.t=fs.readFileSync('../'+pd.file+'.torrent');
                // }
                if (!this.totalFile) {
                  this.totalFile=fs.readFileSync('.././Files/'+pd.file);
                }
                
                // var pieces=parse(this.t).pieces,
                // index=pieces.indexOf(pd.piece),
                sf=this.totalFile.slice(pd.piece*pd.length,(pd.piece+1)*pd.length);
                if (sf.length==0) {
                  throw 'wtf?'
                }
                console.log(sf.length,pd.piece,event);


                event.target.send(sf)

                // totalFile=null;
                // t=null;
                sf=null;

             }
            
            

      			}.bind(this);//onmessage		
   			}.bind(this);//ondatachanal
  		}//init
  	}

  	function sendOffer(desc){
   		this.pc.setLocalDescription(desc);
        
   		so.emit('offer',{sdp:desc,to:this.roId,from:so.username})
	}

	function answerOffer(desc){
		this.pc.setLocalDescription(desc);
       
		so.emit('answer',{sdp:desc,to:this.roId,from:so.username})
	}


  	peer.prototype.setRomote=function(desc,id){
  		if(!peerConnectByUser[id]){
  			peerConnectByUser[id]=this;
  		}

  		if(this.roId==null){
  			this.roId=id
  		}
  		// if(this.pc.negoState === false){

  			console.log('设置远端');
  		this.pc.setRemoteDescription(new RTCSessionDescription(desc));
  		// this.pc.negoState=true;
  		// }
  	}

  	peer.prototype.startOffer=function(desc){


  		console.log('发起offer');
  		this.dc['test']=this.pc.createDataChannel('nego')
  		this.pc.createOffer(sendOffer.bind(this),function(err){
		console.log(err);
		})
		
  	}

  	peer.prototype.answer=function(){

  		console.log('响应offer');
  		this.dc['test']=this.pc.createDataChannel('nego')
  		this.pc.createAnswer(answerOffer.bind(this),function(err){
		console.log(err);
		})

		
  	}

  	peer.prototype.addCandidate=function(can){
  		console.log('添加candidate');
        this.pc.addIceCandidate(new RTCIceCandidate(can));
  	}

    
    peer.fn.init.prototype = peer.prototype;

    global.peer = peer

// export {peer}
})(global)