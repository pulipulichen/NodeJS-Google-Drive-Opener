const { exec } = require("child_process");
const fs = require('fs')
const path = require('path')
const getArgv = require('./lib/getArgv')

let googleChromePathList = [
  '/usr/bin/google-chrome-stable',
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
]

let textEditorPathList = [
  '/usr/bin/kate',
  '/usr/bin/gedit'
]

//let argvs = [
//  '/home/pudding/Desktop/QSync/test.gsheet',
//  '/home/pudding/Desktop/QSync/test.gslides'
//]

let argvs = getArgv()

const getGoogleChromePath = function () {
  for (let i = 0; i < googleChromePathList.length; i++) {
    if (fs.existsSync(googleChromePathList[i])) {
      return `"${googleChromePathList[i]}"`
    }
  }
}

const getTextEditorPath = function (size) {
  for (let i = 0; i < textEditorPathList.length; i++) {
    if (textEditorPathList[i] === '/usr/bin/kate'
            && size > 102400) {
      continue
    }
    if (fs.existsSync(textEditorPathList[i])) {
      return textEditorPathList[i]
    }
  }
}

const openAPP = function (url) {
  let chromeAPP = getGoogleChromePath()
  exec(`${chromeAPP} --app=${url}`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
  })
}

const openFile = function (url) {
  let size = fs.statSync(url).size
  let editorAPP = getTextEditorPath(size)
  exec(`${editorAPP} "${url}"`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
  })
}

argvs.forEach(f => {
  if (!f.endsWith('.gdoc')
          && !f.endsWith('.gsheet')
          && !f.endsWith('.gslides')
          && !f.endsWith('.glink')) {
    // 改用預設的編輯器開啟
    openFile(f)
    return true
  }
  
  
  let content = fs.readFileSync(f, 'utf8')
  if (!content.startsWith('http')) {
    content = JSON.parse(content)
    content = content.url
  }
  
  openAPP(content)
})
//openAPP('http://blog.pulipuli.info')
  