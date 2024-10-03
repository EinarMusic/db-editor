// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fileRequest: (callback) => {
        ipcRenderer.send('file-request')

        ipcRenderer.on('file', callback)
    },    
    fileResponse: (callback) => {
        ipcRenderer.send('application:download')

        ipcRenderer.on('path', callback);
    },
    startCopyVideo: (videoPath) => {
        ipcRenderer.send('copy-video', videoPath);
    },
    startCutVideo: (videoPath, reconds, outputName) => {
        ipcRenderer.send('cut-video', videoPath, reconds, outputName);
    },
    startDownloadVideo: (videoPath) => {
        ipcRenderer.send('download-video', videoPath);
    },
    // para escuhcar desde el cliente el resultado de cut.
    ipcRenderer: {
      on: (channel, func) => {
        const validChannels = ['cut-status', 'download-status']; // Canales permitidos

        if (validChannels.includes(channel)) {
          // Suscribirse a los mensajes del canal
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      }
    },
});
