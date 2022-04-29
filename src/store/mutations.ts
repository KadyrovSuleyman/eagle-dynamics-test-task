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
    // console.log(state.playersList);
    // console.log(state.blackList);
    // console.log(state.selectedPlayerIndex);
    // console.log(id);

    state.playersList.splice(
      state.playersList.findIndex((player) => player.id === id),
      1,
    );
    state.blackList.push(id);
    state.selectedPlayerIndex = -1;
  },
};

export default mutations;
