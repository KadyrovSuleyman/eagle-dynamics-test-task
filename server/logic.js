export const __esModule = true;
// exports.wff = exports.wf = void 0;
import { list } from './list.js';

const CONNECTION_PERIOD = 2100;
const DISCONNECTION_PERIOD = 3500;
const DELAY_BEFORE_START_DISCONNECTIONS = 4000;
const getRandomInt = function (max) { return Math.floor(Math.random() * max); };
const wf = function (send) {
  const offline = list.map((player) => player.id);
  const online = [];
  let connectTimer = setTimeout(function tick() {
    connectTimer = setTimeout(tick, CONNECTION_PERIOD);
    const targetIdx = getRandomInt(offline.length);
    if (!offline[targetIdx]) {
      return;
    }
    send(JSON.stringify({
      connect: offline[targetIdx],
    }));
    online.push(offline[targetIdx]);
    offline.splice(targetIdx, 1);
  }, CONNECTION_PERIOD);
  setTimeout(() => {
    let disconnectTimer = setTimeout(function tick() {
      disconnectTimer = setTimeout(tick, DISCONNECTION_PERIOD);
      const targetIdx = getRandomInt(online.length);
      if (!online[targetIdx]) {
        return;
      }
      send(JSON.stringify({
        disconnect: online[targetIdx],
      }));
      offline.push(online[targetIdx]);
      online.splice(targetIdx, 1);
    }, DISCONNECTION_PERIOD);
  }, DELAY_BEFORE_START_DISCONNECTIONS);
};
const _wf = wf;
export { _wf as wf };
const wff = function (message, send) {
  let id;
  try {
    id = JSON.parse(message).info;
  } catch (err) {
    console.warn('json parse error: '.concat(err));
  }
  if (!id) {
    return;
  }
  send(JSON.stringify(list.find((player) => player.id === id)));
};
const _wff = wff;
export { _wff as wff };
