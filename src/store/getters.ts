import STATUS from '@/types/status';
import { GetterTree } from 'vuex';
import { StateT } from './state';

const getters: GetterTree<StateT, any> = {
  isAtLeastOnePlayer: (state: StateT) => state.playersList.length > 0,

  totalPlayersNumber: (state: StateT) => state.playersList.length,
  onlinePlayersNumber: (state: StateT) => state.playersList.filter(
    (player) => player.status === STATUS.ONLINE,
  ).length,

  isAnyPlayerSelected: (state: StateT) => state.selectedPlayerIndex !== -1,
  selectedPlayer: (state: StateT) => state.playersList[state.selectedPlayerIndex],
};

export default getters;
