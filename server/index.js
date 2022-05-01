const http = require('http');
const ws = require('ws');
const { wf, wff } = require('./logic');

const wss = new ws.Server({ noServer: true });

const accept = (req, res) => {
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket') {
    res.end();
    return;
  }

  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
};

const onConnect = (ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
    wff(message, ws.send.bind(ws));
  });

  console.log('open');

  // let timerId = setTimeout(function tick() {
  //   ws.send('zxcvz');
  //   timerId = setTimeout(tick, 3000);
  // }, 3000);

  wf(ws.send.bind(ws));
};

if (!module.require.main) {
  http.createServer(accept).listen(3000);
} else {
  exports.accept = accept;
}
