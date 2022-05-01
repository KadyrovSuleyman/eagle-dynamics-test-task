import { list } from './list';

const CONNECTION_PERIOD = 2100;
const DISCONNECTION_PERIOD = 3500;
const DELAY_BEFORE_START_DISCONNECTIONS = 4000;

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const wf = (send: CallableFunction) => {
  const offline = list.map((player) => player.id);
  const online = [] as string[];

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

export const wff = (message: string, send: CallableFunction) => {
  let id: string;
  try {
    id = JSON.parse(message).info;
  } catch (err) {
    console.warn(`json parse error: ${err}`);
  }

  if (!id) {
    return;
  }

  send(JSON.stringify(list.find((player) => player.id === id)));
};
