// import {peer} from "./peer.js";

//现存的peerconnection
var fileMission={}
var peerConnectByUser={}


window.so =  io.connect('http://10.16.66.85:8080');
window.fs = require('fs')
window.parse=require('parse-torrent')

   
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

