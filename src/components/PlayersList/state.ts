import { Player } from '@/types/player';
import { mapState, mapGetters } from 'vuex';

const adaptedState = mapState({
  list: (state: any): Player[] => state.playersList,
});

const adaptedGetters = mapGetters({
  selected: 'selectedPlayer',
});

const state = {
  ...adaptedState,
  ...adaptedGetters,
};

export default state;
