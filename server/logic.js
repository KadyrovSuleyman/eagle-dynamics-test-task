const ImportedList = require('./list');

const CONNECTION_PERIOD = 2000;
const DISCONNECTION_PERIOD = 2000;
const DELAY_BEFORE_START_DISCONNECTIONS = 11000;

function getRandomInt(max) { return Math.floor(Math.random() * max); }

function setConnectPlayerInterval(online, offline, send) {
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
}

function setDisconnectPlayerInterval(online, offline, send) {
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
}

function setSendingData(send) {
  const offline = ImportedList.list.map((player) => player.id);
  const online = [];

  setConnectPlayerInterval(online, offline, send);

  setTimeout(() => {
    setDisconnectPlayerInterval(online, offline, send);
  }, DELAY_BEFORE_START_DISCONNECTIONS);
}
exports.setSendingData = setSendingData;

function receiveDataHandler(message, send) {
  let id;
  try {
    id = JSON.parse(message).info;
  } catch (err) {
    console.warn('json parse error: '.concat(err));
  }
  if (!id) {
    return;
  }
  send(JSON.stringify(ImportedList.list.find((player) => player.id === id)));
}
exports.receiveDataHandler = receiveDataHandler;
