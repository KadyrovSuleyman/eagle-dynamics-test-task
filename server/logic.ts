import { list } from './list';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const wf = (send: CallableFunction) => {
  const offline = list.map((player) => player.id);
  const online = [] as string[];

  let connectTimer = setTimeout(function tick() {
    connectTimer = setTimeout(tick, 2000);

    const targetIdx = getRandomInt(offline.length);
    if (!offline[targetIdx]) {
      return;
    }

    // console.log(JSON.stringify({
    //   connect: offline[targetIdx],
    // }));

    send(JSON.stringify({
      connect: offline[targetIdx],
    }));

    online.push(offline[targetIdx]);
    offline.splice(targetIdx, 1);

    // console.log(online);
    // console.log(offline);
  }, 2000);

  let disconnectTimer = setTimeout(function tick() {
    disconnectTimer = setTimeout(tick, 3000);

    const targetIdx = getRandomInt(online.length);
    if (!online[targetIdx]) {
      return;
    }

    send(JSON.stringify({
      disconnect: online[targetIdx],
    }));

    offline.push(online[targetIdx]);
    online.splice(targetIdx, 1);

    // console.log(offline);
    // console.log(online);
  }, 3000);
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
