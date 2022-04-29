import { Player } from '@/types/player';
import { mapState } from 'vuex';

const adaptedState = mapState({
  isPlayerSelected: (state: any): boolean => state.selected,
  player: (state: any): Player => state.player,
});

export default adaptedState;

// import { mapGetters } from 'vuex';

// const adaptedState = mapGetters({
//   isPlayerSelected: 'isAnyPlayerSelected',
//   player: 'selectedPlayer',
// });

// const state = {
//   ...adaptedState,
// };

// export default state;
