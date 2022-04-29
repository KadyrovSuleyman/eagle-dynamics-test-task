const http = require('http');
const ws = require('ws');

const wss = new ws.Server({ noServer: true });

const accept = (req, res) => {
  // все входящие запросы должны использовать websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket') {
    res.end();
    return;
  }

  // может быть заголовок Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
};

const onConnect = (ws) => {
  ws.on('message', (message) => {
    // ws.send(`answer: ${message}`);

    // setTimeout(() => ws.send('zxvz'), 10000);
    console.log(`received: ${message}`);
  });

  console.log('open');

  let timerId = setTimeout(function tick() {
    ws.send('zxcvz');
    timerId = setTimeout(tick, 3000);
  }, 3000);
};

if (!module.require.main) {
  http.createServer(accept).listen(3000);
} else {
  exports.accept = accept;
}
