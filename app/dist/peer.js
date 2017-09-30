// var peerInital=function(){
(function(){



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
			this.pc= new webkitRTCPeerConnection(configuration);
      this.dc={};
      this.temp={};
        	// this.pieceLen=length;
      this.pc.negoState = false;
      this.pc.onicecandidate = function (evt) {
   		
        if (evt.candidate){
     		 so.emit('candidate',{
         		 'candidate': evt.candidate,
         		 'to':this.roId,
         		 'from':so.uid
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
                console.log('发送方收到收据');
                // console.log(event);
          try{

          if (!totalFile[pd.hash]) {

            totalFile[pd.hash]=fs.openSync('./Files/'+pd.file,'r');

          }
          

          var len=(pd.tl-pd.piece*pd.length)>=pd.length?pd.length:(pd.tl-pd.piece*pd.length);
          var sf=Buffer.allocUnsafe(len);
          fs.read(totalFile[pd.hash], sf, 0, len, pd.piece*pd.length, function(err,byteRead,buffer){
            

            console.log(sf.length,sf,pd.piece);
            if (sf.length===0) {
              throw 'wtf?';
            }


            var a=[];

            split(a,sf,0);


            for(let i=0;i<a.length;i++){

              event.target.send(a[i]);
            }

            sf=null;
          });

          }catch(e){
            // var storage=localStorage.getItem(pd.hash);
            // var result=storage==='allClean'?'wrong':storage.split(',');
            // if(Array.isArray(result)){
            //   result[pd.piece]=0;
            // }
            // localStorage.setItem(pd.hash,result)
            console.log(e);
          }

          }//pd
          
      		}.bind(this);//onmessage		
   			}.bind(this);//ondatachanal
  		}//init
  }

  function sendOffer(desc){
   		this.pc.setLocalDescription(desc);
        
   		so.emit('offer',{sdp:desc,to:this.roId,from:so.uid})
	}

	function answerOffer(desc){
		this.pc.setLocalDescription(desc);
       
		so.emit('answer',{sdp:desc,to:this.roId,from:so.uid})
	}

  function split(arr,file,pos){
    if(pos<file.length){
    
      var c=file.slice(pos,pos+65536);
      arr.push(c)
      return split(arr,file,pos+65536);
    }
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

  window.peer=peer;
})(window)