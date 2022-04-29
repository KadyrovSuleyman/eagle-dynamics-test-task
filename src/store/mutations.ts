import STATUS from '@/types/status';
import { Player } from '@/types/player';
import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  toSelectPlayer: (state: StateT, id: string) => {
    state.selectedPlayerIndex = state.playersList.findIndex((player) => player.id === id);
  },

  toAddPlayer: (state: StateT, player: Player) => {
    state.playersList.push(player);
  },

  toBanPlayer: (state: StateT, id: string) => {
    state.playersList.splice(
      state.playersList.findIndex((player) => player.id === id),
      1,
    );
    state.blackList.push(id);
    state.selectedPlayerIndex = -1;
  },

  toConnectPlayer: (state: StateT, id: string) => {
    const target = state.playersList.find((player) => player.id === id);
    if (target) {
      target.status = STATUS.ONLINE;
    }
  },

  toDisconnectPlayer: (state: StateT, id: string) => {
    const target = state.playersList.find((player) => player.id === id);
    if (target) {
      target.status = STATUS.OFFLINE;
    }
  },
};

export default mutations;
