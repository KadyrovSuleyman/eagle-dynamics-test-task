// /* eslint-disable no-param-reassign */
// import { Player } from '@/types/player';
// import { ActionContext, ActionTree } from 'vuex';
// import { StateT } from './state';

// const actions: ActionTree<StateT, any> = {
//   toSelectPlayer: (store: ActionContext<StateT, any>, id: string) => {
//     store.commit('toSelectPlayer', id);
//   },

//   toAddPlayer: (store: ActionContext<StateT, any>, player: Player) => {
//     store.commit('toAddPlayer', player);
//     store.dispatch('toConnectPlayer', player.id);
//   },

//   toBanPlayer: (store: ActionContext<StateT, any>, id: string) => {
//     store.commit('toBanPlayer', id);
//   },

//   toGetPlayerData: (store: ActionContext<StateT, any>, id: string) => {
//     console.warn('send player data request by id');
//     store.dispatch('toAddPlayer');
//   },

//   playerConnected: async (store: ActionContext<StateT, any>, id: string) => {
//     if (store.state.blackList.includes(id)) {
//       console.warn('you are banned!');
//       return;
//     }

//     // if (!store.state.playersList.includes(player)) {
//     //   store.commit('toAddPlayer', player);
//     // }
//     if (!store.state.playersList.map((player) => player.id).includes(id)) {
//       await store.dispatch('toGetPlayerData', id);
//     }

//     store.commit('toConnectPlayer', id);
//   },

//   playerDisconnected: (store: ActionContext<StateT, any>, id: string) => {
//     store.commit('toDisconnectPlayer', id);
//   },
// };

// export default actions;

// ======================================

/* eslint-disable no-param-reassign */
import { Player } from '@/types/player';
import { ActionContext, ActionTree } from 'vuex';
import socket from '@/ws';
import { StateT } from './state';

const actions: ActionTree<StateT, any> = {
  toSelectPlayer: (store: ActionContext<StateT, any>, id: string) => {
    store.commit('toSelectPlayer', id);
  },

  toAddPlayer: (store: ActionContext<StateT, any>, player: Player) => {
    store.commit('toAddPlayer', player);
    store.dispatch('toConnectPlayer', player.id);
  },

  // toBanPlayer: (store: ActionContext<StateT, any>, id: string) => {
  //   store.commit('toBanPlayer', id);
  // },

  toBanPlayer: (store: ActionContext<StateT, any>, id: string) => {
    socket.send(JSON.stringify({
      ban: id,
    }));
  },

  toGetPlayerData: (store: ActionContext<StateT, any>, id: string) => {
    console.warn('send player data request by id');
    store.dispatch('toAddPlayer');
  },

  playerConnected: async (store: ActionContext<StateT, any>, id: string) => {
    if (store.state.blackList.includes(id)) {
      console.warn('you are banned!');
      return;
    }

    // if (!store.state.playersList.includes(player)) {
    //   store.commit('toAddPlayer', player);
    // }
    if (!store.state.playersList.map((player) => player.id).includes(id)) {
      await store.dispatch('toGetPlayerData', id);
    }

    store.commit('toConnectPlayer', id);
  },

  playerDisconnected: (store: ActionContext<StateT, any>, id: string) => {
    store.commit('toDisconnectPlayer', id);
  },
};

export default actions;
