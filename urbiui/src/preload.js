// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');
const net = require('net');

var socket = null;
var onMessage = null;
var onClose = null;
function onReceive(txt) {
    if (onMessage)
        onMessage(txt);
}
contextBridge.exposeInMainWorld(
    'netBridge',
       {
           connect: function(host, port) {
               socket = new net.Socket();
               socket.connect(port, host);
               socket.on("data", e => {
                       var pl = e.toString();
                       onReceive(pl);
               });
               socket.on('close', e => { if (onClose) onClose();});
           },
           onMessage: function(f) {
               onMessage = f;
           },
           onClose: function(f) {
               onClose = f;
           },
           send: function(msg) {
               socket.write(msg);
           },
       }
    );