// import { store } from '@/store';
// import { StateT } from '@/store/state';
// import { Store, ActionContext } from 'vuex';

// const Socket = (store: ActionContext<StateT, any>) => {
//   const socket = new WebSocket('ws://localhost:3000');

//   socket.onopen = (e) => {
//     console.log('[open] Соединение установлено');
//   };

//   socket.onmessage = (event) => {
//     let data: { [message: string]: string };
//     try {
//       data = JSON.parse(event.data);
//       if (!data) {
//         return;
//       }
//       // console.log(data);
//       if (data.connect) {
//         store.dispatch('playerConnected', data.connect);
//       }
//       if (data.disconnect) {
//         store.dispatch('playerDisconnected', data.disconnect);
//       }
//       if (data.id) {
//         store.commit('toAddPlayer', data);
//         store.commit('toConnectPlayer', data);
//       }
//     } catch (err) {
//       console.warn(`json parse error: ${err}`);
//     }
//   };

//   socket.onclose = (event) => {
//     if (event.wasClean) {
//       console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
//     } else {
//     // например, сервер убил процесс или сеть недоступна
//     // обычно в этом случае event.code 1006
//       console.log('[close] Соединение прервано');
//     }
//   };

//   socket.onerror = (error) => {
//     console.log(`[error] ${error}`);
//   };

//   return socket;
// };

// export default Socket;

// import { StateT } from '@/store/state';
// import { Store, ActionContext } from 'vuex';
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
    // console.log(data);
    if (data.connect) {
      store.dispatch('playerConnected', data.connect);
    }
    if (data.disconnect) {
      store.dispatch('playerDisconnected', data.disconnect);
    }
    if (data.id) {
      store.commit('toAddPlayer', data);
      store.commit('toConnectPlayer', data);
    }
  } catch (err) {
    console.warn(`json parse error: ${err}`);
  }
};

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    console.log('[close] Соединение прервано');
  }
};

socket.onerror = (error) => {
  console.log(`[error] ${error}`);
};

export default socket;
