const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const config = require('./lighthouse.config.js');
function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
  return chromeLauncher.launch(flags).then(chrome => {
    flags.port = chrome.port;
    return lighthouse(url, flags, config).then(results =>
      chrome.kill().then(() => results));
  });
}

const flags = {
  chromeFlags: ['--headless'],
  maxWaitForLoad: 1000 * 60
};

launchChromeAndRunLighthouse('http://act.vip.xunlei.com/pc/vip/2017/laxin/', flags, config).then(results => {
    results.artifacts = 'ignore'
    results.reportCategories = 'ignore '
   console.log(JSON.stringify(results, null, 4))
})
.catch(e =>{
  console.log(e)
});