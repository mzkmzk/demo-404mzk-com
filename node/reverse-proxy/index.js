var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    url = require('url'),
    port = 3336;

http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
    var pathname = url.parse(req.url).pathname;
    var remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log(remoteip + ' ' + hostname + pathname);
    console.log(hostname);
    switch(hostname)
    {
        case 'localhost':
            console.log('case localhost')
            //uncomment the line below if you're using apache virtual hosts and need to change the header to reflect virtual host
            //req.headers.host = "example1.com"
            proxy.web(req, res, { target: 'http://127.0.0.1:1080' });
            break;
        case 'example1.ddns.net':
            //uncomment the line below if you're using apache virtual hosts and need to change the header to reflect virtual host
            //req.headers.host = "example2.dev";
            proxy.web(req, res, { target: 'http://example2.dev' });
            break;
        case 'dmccarthy.io':
        case 'www.dmccarthy.io':
            proxy.web(req, res, { target: 'http://192.168.1.151' });
            break;
        default:
            break;
    }
}).listen(port, function() {
    console.log('proxy listening on port ' + port);
});