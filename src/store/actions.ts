/* eslint-disable no-param-reassign */
import { ActionContext, ActionTree } from 'vuex';
import socket from '@/ws';
import { StateT } from './state';

const actions: ActionTree<StateT, any> = {
  toSelectPlayer: (store: ActionContext<StateT, any>, id: string) => {
    store.commit('toSelectPlayer', id);
  },

  toAddPlayer: (store: ActionContext<StateT, any>, id: string) => {
    socket.send(JSON.stringify({
      info: id,
    }));
  },

  toBanPlayer: (store: ActionContext<StateT, any>, id: string) => {
    store.commit('toBanPlayer', id);
  },

  playerConnected: async (store: ActionContext<StateT, any>, id: string) => {
    if (store.state.blackList.includes(id)) {
      console.warn('Попытка подключения забаненного игрока:', id);
      return;
    }

    if (!store.state.playersList.map((player) => player.id).includes(id)) {
      await store.dispatch('toAddPlayer', id);
    }

    store.commit('toConnectPlayer', id);
  },

  playerDisconnected: (store: ActionContext<StateT, any>, id: string) => {
    store.commit('toDisconnectPlayer', id);
  },
};

export default actions;
