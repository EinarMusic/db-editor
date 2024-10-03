const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath)

const youtubedl = require('youtube-dl-exec')

const fs = require('fs');
const path = require('node:path');

const { app, BrowserWindow, dialog, ipcMain } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  // Mantener la seguridad
      nodeIntegration: false   // Deshabilitar la integración directa de Node.js
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// agregado por mi

// cut video.
ipcMain.on("cut-video", (event, videoPath, cut, outputName) => {
  ffmpeg(videoPath)
  .videoFilters(cut.video)
  .audioFilters(cut.audio)
  .on("end", () => {
    event.reply("cut-status", "success")
  })
  .on("error", () => {
    event.reply("cut-status", "error")
  })
  .save(outputName)
})

// downloadStatus
ipcMain.on("download-video", (event, youtubeId) => {
const videoPath = path.join(app.getPath('desktop'), youtubeId); // download path (any OS).
const url = `https://www.youtube.com/watch?v=${youtubeId}`

// const removeVideoInfoJson = () => fs.unlink("videoInfo.json", () => {})

const getInfo = (url, flags) =>
  youtubedl(url, { dumpSingleJson: true, ...flags })

const fromInfo = (infoFile, flags) =>
  youtubedl.exec('', { loadInfoJson: infoFile, ...flags })

async function main (url) { 

  const info = await getInfo(url)

  fs.writeFileSync(videoPath+'.json', JSON.stringify(info))
  // fs.writeFileSync('videoInfo.json', JSON.stringify(info))

  // if (!fs.existsSync(path.join(app.getPath('desktop')))) {}
  
  await fromInfo(videoPath+'.json', { output: videoPath })
  .then(() => {
    event.reply("download-status", "success")
    // removeVideoInfoJson()
  })
  .catch(err => {
    event.reply("download-status", "error")
    // removeVideoInfoJson()
  })
}

main(url)
})

const setting = {
title: 'Select the Video to be uploaded',
buttonLabel: 'Upload',
filters: [{ name: "Videos", extensions: ["mp4", "webm"] }],
properties: ['openFile', 'openDirectory'], // Specifying the File Selector Property
}

// file request
ipcMain.on('file-request', (event) => {  
// If the platform is 'win32' or 'Linux'
if (process.platform !== 'darwin') {
  dialog.showOpenDialog(setting).then(file => {
    console.log(file.canceled);
    if (!file.canceled) {
      const filepath = file.filePaths[0].toString();
      console.log(filepath);
      event.reply('file', filepath);
    }  
  }).catch(err => {
    console.log(err)
  });
} else {
  // If the platform is 'darwin' (macOS)
  dialog.showOpenDialog(setting).then(file => {
    console.log(file.canceled);
    if (!file.canceled) {
      const filepath = file.filePaths[0].toString();
      console.log(filepath);
      event.reply('file', filepath);
  }  
}).catch(err => {
    console.log(err)
  });
}
});

// file response
ipcMain.on('application:download', function(event, buffer) {
dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
 title: 'Download to File…',
 filters: [{ name: 'All Files', extensions: ['*'] }]
})
.then((file) => {
  console.log(file.canceled)
  if (!file.canceled) {
    const filepath = file
    event.reply('path', filepath);
  }
})
.catch(err => {
  console.log(err)
});
});