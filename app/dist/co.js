// import {peer} from "./peer.js";

//现存的peerconnection

var io=require('socket.io-client')

// var file=require('./file.js')

var fs = require('fs')
var parse=require('parse-torrent')



var so=io.connect('http://10.16.66.85:8080');


    /////////////////////////////////////////////////////////////////////

    so.on('icecandidate',  function(data) {
      peerConnectByUser[data.from].addCandidate(data.candidate)
      // console.log('new candicate!');
    });

    so.on('newOffer', function(data) {

      if (!peerConnectByUser[data.from]) {
        console.log('无现有peerconnection 创建');
        peerConnectByUser[data.from]=peer(data.from)
      }
  

      peerConnectByUser[data.from].setRomote(data.sdp,data.from)

      peerConnectByUser[data.from].answer();

    });

    so.on('answered', function(data) {

      peerConnectByUser[data.from].setRomote(data.sdp,data.from)

    });

    so.on('roommess', function(data) {
      console.log(data.from);
    });

    so.on('torrentArrive',function(data){
      new file(Buffer.from(data))
    });

    so.on('pieceSearch',function(data){
      // console.log(data.piece)
      console.log('someone is searching for:'+data.file);
      so.emit('pieceSearch_Result',{file:data.file,piece:data.piece,holder:so.username})
    });

    so.on('rrr',function(data){
      console.log(data);
    });


    so.on('pieceUpdate', function(data) {
      // ipc.send('pieceMessage',data.file,data.piece,data.holder)
      console.log('有块请求被回应');
      fileMission[data.file].pieceMessage[data.piece]=data.holder
    });

    so.on('searchResult',  function(data) {
      ipc.send('searchResult',data);
    });

