var request = require('request')
var Agent = require('socks5-http-client/lib/Agent')
var request_option = {
    url: 'http://api.huobi.pro/market/tickers',
    agentClass: Agent,
    agentOptions: {
        socksHost: '127.0.0.1',
        socksPort: 1086
    }
}

request(request_option, (err, res, body) => {
    let obj = JSON.parse(body);
    console.log(obj.data[0]);
    console.log(makeColumsFromObj(obj.data[0]))
})

function makeColumsFromObj(obj) {
    let colums = []
    let names = Object.getOwnPropertyNames(obj)
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        colums.push({title: name, key: name, dataIndex: name})
    }
    return colums;
}