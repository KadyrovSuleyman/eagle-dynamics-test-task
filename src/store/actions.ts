/* eslint-disable no-param-reassign */
import { Player } from '@/types/player';
import { ActionContext, ActionTree } from 'vuex';
import { StateT } from './state';

const actions: ActionTree<StateT, any> = {
  toSelectPlayer: (store: ActionContext<StateT, any>, id: string) => {
    store.commit('toSelectPlayer', id);
  },

  toAddPlayer: (store: ActionContext<StateT, any>, player: Player) => {
    store.commit('toAddPlayer', player);
  },

  toBanPlayer: (store: ActionContext<StateT, any>, id: string) => {
    store.commit('toBanPlayer', id);
  },

  playerConnected: (store: ActionContext<StateT, any>, player: Player) => {
    if (store.state.blackList.includes(player.id)) {
      console.warn('you are banned!');
      return;
    }

    if (!store.state.playersList.includes(player)) {
      store.commit('toAddPlayer', player);
    }

    store.commit('toConnectPlayer', player.id);
  },

  playerDisconnected: (store: ActionContext<StateT, any>, id: string) => {
    store.commit('toDisconnectPlayer', id);
  },
};

export default actions;
