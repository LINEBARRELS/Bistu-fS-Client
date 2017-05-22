var io=require('socket.io-client');
var socket_init=require('./co.js')


function client(){


	this.so=io.connect('http://10.16.66.85:8080');
	this.fileMission={};
	this.peerConnectByUser={};


	socket_init();

}