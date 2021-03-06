// import {peer} from "./peer.js";

//现存的peerconnection

var io=require('socket.io-client');

// var file=require('./file.js')

var fs = require('fs');
var parse=require('parse-torrent');

var deleting={}

  try{
     var so=io.connect('http://10.16.66.87:8080');
   }catch(e){
    log(e);
   }
 
    /////////////////////////////////////////////////////////////////////

  so.on('icecandidate',  function(data) {
    peerConnectByUser[data.from].addCandidate(data.candidate);
    // console.log('new candicate!');
  });

  so.on('newOffer', function(data) {

    if (!peerConnectByUser[data.from]) {
      console.log('无现有peerconnection 创建');
      peerConnectByUser[data.from]=peer(data.from);
    }
  

    peerConnectByUser[data.from].setRomote(data.sdp,data.from)

    peerConnectByUser[data.from].answer();
  });

  so.on('answered', function(data) {

    peerConnectByUser[data.from].setRomote(data.sdp,data.from);
  });

  so.on('roommess', function(data) {
    console.log(data.from);
  });

  so.on('torrentArrive',function(data){
    if(!fileMission[data.hash]){
      var fm=new file(Buffer.from(data.torr));
    }
    // ipc.send('fmToMain',fm)
  });

  so.on('pieceSearch',function(data){
    // console.log(data.piece)
    console.log('someone is searching for:'+data.file);

    var local = localStorage.getItem(data.hash);
    if(local!==null){
      var li = local.split(',');

      if(li[0]==='allClean'||li[data.piece]==1){
        console.log('应答');
        so.emit('pieceSearch_Result',{hash:data.hash,file:data.file,piece:data.piece,holder:so.uid});
      }
    }
  });

  so.on('pieceUpdate', function(data) {

    console.log('有块请求被回应',data.hash,data.piece,data.holder);
    if(fileMission[data.hash]){
      fileMission[data.hash].updateMessage(data.piece,data.holder)
    }
  });

  so.on('searchResult',  function(data) {
    ipc.send('searchResult',data);
  });

  so.on('leave',function(data){

    
    var dis = peerConnectByUser[data]
    if (dis!=null) {

      for(let i in dis.dc){
        if(dis.dc[i]){
          i!=='test'?dis.dc[i].close():null;
        }
      }

      // delete peerConnectByUser[data]

    }
  })

  so.on('connection_wrong',function(data){
    for(let fm of fileMission){
      for(let i in fm.piecesBelong){
          if(fm.piecesBelong[i]===data){
            fm.piecesBelong[i]=null;
          }
          if(fm.pieceMessage[i]===data){
            fm.pieceMessage[i]=null;
          }
      }
    }//fm
  })