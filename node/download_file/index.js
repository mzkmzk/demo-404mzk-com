
var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var now_path = path.join(process.cwd() + '/17979001.mp4') 
function downloadFile(url, localFile, callback) {
  var httpClient = url.slice(0, 5) === 'https' ? https : http;
  var writer = fs.createWriteStream(localFile);
  writer.on('finish', function() {
    callback(localFile);
  });
  httpClient.get(url, function(response) {
    response.pipe(writer);
  });
}
//https://images.sex.com/images/pinporn/2017/06/29/300/17979001.jpg
downloadFile('http://videos1.sex.com/stream/2017/06/19/619583.mp4', now_path, (...args) => {
    console.log(args)
})