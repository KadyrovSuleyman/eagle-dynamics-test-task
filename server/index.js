const http = require('http');
const WS = require('ws');
const { setSendingData, receiveDataHandler } = require('./logic');

const wss = new WS.Server({ noServer: true });

const onConnect = (ws) => {
  ws.on('message', (message) => {
    receiveDataHandler(message, ws.send.bind(ws));
  });

  setSendingData(ws.send.bind(ws));
};

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

if (!module.require.main) {
  http.createServer(accept).listen(3000);
  console.log(`
Socket Server started
ws://localhost:3000
  `);
} else {
  exports.accept = accept;
}
