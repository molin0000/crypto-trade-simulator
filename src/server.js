var express = require('express');
let app = express();
let http = require('http')
const request = require('request');
var Agent = require('socks5-http-client/lib/Agent')

let server = http.Server(app);

//allow custom header and CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

app.use(express.static("build"));

let binancePath = '/api/v3/ticker/price'
let binanceUrl = 'http://api.binance.com'
let huobiUrl = 'http://api.huobi.pro'
let huobiPath = '/market/tickers'

var request_option = {
  url: huobiUrl + huobiPath,
  agentClass: Agent,
  agentOptions: {
    socksHost: '127.0.0.1',
    socksPort: 1086
  }
}



app.get('/info', async function (req, resParent) {
  request(request_option, (err, res, body) => {
    let obj = JSON.parse(body);
    resParent.send({ dataSource: obj.data })
  })
});


const port = 8000;
server.listen(port);
console.log('listening on port ', port);

