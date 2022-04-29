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
};

export default actions;
