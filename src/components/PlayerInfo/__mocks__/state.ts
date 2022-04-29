import { Player } from '@/types/player';
import { mapState } from 'vuex';

const adaptedState = mapState({
  isPlayerSelected: (state: any): boolean => state.selected,
  player: (state: any): Player => state.player,
});

export default adaptedState;
