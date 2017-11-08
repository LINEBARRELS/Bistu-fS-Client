'use strict';

const electron = require('electron');
const fs = require('fs');
const event = require('events');

const parse = require('parse-torrent');
// 控制应用生命周期的模块。
const {app} = electron;
const {BrowserWindow} = electron;
const {ipcMain} = electron;

let mainWindow = null,
  login = null,
  back = null;

var createTorrent = require('create-torrent');

var file = require('./app/dist/file.js')

// global.peer =require('./app/dist/peer.js')
// var test=require('./test.js')

var piece_message = {};
var temp = {};

var uid = null;

let ses = null;

app.on('ready', function() {
  login = new BrowserWindow({
    resizable: false,
    transparent: true,
    frame: false,
    height: 450,
    width: 670,
    minWidth: 670,
    minHeight: 450
  })
  // login.openDevTools();
  login.loadURL('file://' + __dirname + '/login.html');

});

// app.on('quit',function(){

// })
ipcMain.on('login', function(event, user, pass) {})

ipcMain.on('success', function(event, user, uid) {
  login.hide();
  const ses = login.webContents.session;
  global.uid = uid;
  mainWindow = new BrowserWindow({
    // resizable:false,
    transparent: true,
    frame: false,
    height: 600,
    width: 900,
    minWidth: 900,
    minHeight: 600
  });

  back = new BrowserWindow({height: 500, width: 500})

  fs.mkdir('./torrents', (err) => {});

  fs.mkdir('./Files', (err) => {});

  back.on('close', function() {
    back.webContents.send('quit');
  })

  back.openDevTools();
  back.loadURL('file://' + __dirname + '/back.html');
  // back.hide();

  mainWindow.openDevTools();
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  ////////////////////////////////////////////////////////////////////////////////////////////
  back.webContents.on('did-finish-load', function() {
    back.webContents.send('socketInit', user, uid);
  });

  mainWindow.webContents.on('did-finish-load', function() {

    mainWindow.webContents.send('userinfo', user, uid);

  });

  login.close();
}); //

ipcMain.on('quit', function(event) {

  // ipcMain.removeAllListeners('watchFm');
  // ipcMain.removeAllListeners('fmReturn');
  if (mainWindow) {
    mainWindow.close();
  }
  if (back) {
    back.close();
  }

  app.quit();
});

ipcMain.on('mini', function(event) {
  mainWindow.minimize();
});

ipcMain.on('createT', function(event, args, opt, uid) {
  opt.createdBy = uid;
  createTorrent(args.path, opt, function(err, torrent) {
    if (!err) {
      var tem = args.path.split('/');
      var name = tem.reverse()[0];

      var pt = parse(torrent);
      // mainWindow.webContents.send('torrentCreated', pt)
      back.webContents.send('torrentCreated', torrent, args, pt.infoHash, uid);
    } else {
      back.webContents.send('err', err, args);
    }

  });
});

// ipcMain.on('roomInit',function(event,name) {
//   fs.readdir('../Files', function(err,files){
//     back.webContents.send('roomInited',files);
//   });
// });

ipcMain.on('fileArrive', function(event, name, posi, file, length, hash) {

  if (!temp[name]) {
    temp[name] = fs.openSync('./Files/' + name, 'w+');
  }
  // var buff=Buffer.from(file)

  fs.write(temp[name], file, 0, file.length, posi * length, (err, written, buffer) => {
    if (!err) {
      // mainWindow.webContents.send('fileWriteCom',written,buffer);

      back.webContents.send('fileWriteCom', hash, posi, written)

    } else {
      mainWindow.webContents.send('fileWriteCom', err);

    }

  })

});

////////////////////////////////////////////////////////////

//Main ---->  Back

ipcMain.on('search', function(event, search) {

  back.webContents.send('search', search);

});

ipcMain.on('searchByType', function(event, search) {

  back.webContents.send('searchType', search);

});

ipcMain.on('download', function(event, name) {

  back.webContents.send('download', name);

});

ipcMain.on('watchFm', function(event, name) {

  back.webContents.send('watchFm');
})

ipcMain.on('triggle', function(event, name) {

  back.webContents.send('triggle', name);
})

ipcMain.on('emitMessage', function(event, value, to, from, username) {

  back.webContents.send('emitMessage', {
    content: value,
    from: from,
    username:username
  },to);

})

//////////////////////////////////////////////////////////

//Back ------>Main

ipcMain.on('searchResult', function(event, data) {
  mainWindow.webContents.send('searchResult', data);
})

ipcMain.on('torrentCreated', function(event) {
  mainWindow.webContents.send('torrentCreated');
})

ipcMain.on('fm', function(event, data) {
  mainWindow.webContents.send('fm', data);
})

ipcMain.on('complete', function(event, data) {
  // fs.closeSync(temp[data]);
  mainWindow.webContents.send('complete', data);
})

ipcMain.on('uploadComplete', function(event, data) {
  mainWindow.webContents.send('uploadComplete')
})

ipcMain.on('uploadFail', function(event, data) {
  mainWindow.webContents.send('uploadFail')
})

ipcMain.on('closeF', function(event, data) {
  fs.closeSync(temp[data]);
})

ipcMain.on('message', function(event, data) {
  mainWindow.webContents.send('message', data)
})

//////////////////////////////////////////////////////

ipcMain.on('start', function(event, name) {
  fileMission[name].start();
})

ipcMain.on('watchMs', function(event) {
  mainWindow.webContents.send('message', fileMission);
})

ipcMain.on('watchPeer', function(event) {
  mainWindow.webContents.send('message', peerConnectByUser);
})

ipcMain.on('watchinit', function(event) {
  mainWindow.webContents.send('message');
})
