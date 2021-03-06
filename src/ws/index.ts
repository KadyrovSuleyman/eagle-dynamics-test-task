import store from '@/store';

const socket = new WebSocket('ws://localhost:3000');

socket.onopen = (e) => {
  console.log('[open] Соединение установлено');
};

socket.onmessage = (event) => {
  let data: { [message: string]: string };
  try {
    data = JSON.parse(event.data);
    if (!data) {
      return;
    }
    if (data.connect) {
      store.dispatch('playerConnected', data.connect);
    }
    if (data.disconnect) {
      store.dispatch('playerDisconnected', data.disconnect);
    }
    if (data.id) {
      store.commit('toAddPlayer', data);
      store.dispatch('playerConnected', data.id);
    }
  } catch (err) {
    console.warn(`json parse error: ${err}`);
  }
};

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    console.log('[close] Соединение прервано');
  }
};

socket.onerror = (error) => {
  console.log(`[error] ${error}`);
};

export default socket;
