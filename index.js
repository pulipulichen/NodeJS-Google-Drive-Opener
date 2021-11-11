const { exec } = require("child_process");
const fs = require('fs')
const path = require('path')
const getArgv = require('./lib/getArgv')

let googleChromePathList = [
  '/usr/bin/google-chrome-stable'
]

//let argvs = [
//  '/home/pudding/Desktop/QSync/test.gsheet',
//  '/home/pudding/Desktop/QSync/test.gslides'
//]

let argvs = getArgv()

const getGoogleChromePath = function () {
  for (let i = 0; i < googleChromePathList.length; i++) {
    if (fs.existsSync(googleChromePathList[i])) {
      return googleChromePathList[i]
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

argvs.forEach(f => {
  if (!f.endsWith('.gdoc')
          && !f.endsWith('.gsheet')
          && !f.endsWith('.gslides')) {
    return false
  }
  
  let content = fs.readFileSync(f)
  content = JSON.parse(content)
  openAPP(content.url)
})
//openAPP('http://blog.pulipuli.info')
  