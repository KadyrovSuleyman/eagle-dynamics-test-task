import { createServer } from 'http';
import Server from 'ws';
import { wf, wff } from './logic.js';


// const { wf } = _a; const
//   { wff } = _a;

const wss = new Server({ noServer: true });
const accept = function (req, res) {
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
var onConnect = function (ws) {
  ws.on('message', (message) => {
    wff(message, ws.send.bind(ws));
  });
  console.log('open');
  wf(ws.send.bind(ws));
};
if (!module.require.main) {
  createServer(accept).listen(3000);
} else {
  exports.accept = accept;
}
