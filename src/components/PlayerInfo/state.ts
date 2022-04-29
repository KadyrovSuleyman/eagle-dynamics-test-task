import { mapGetters } from 'vuex';

const adaptedState = mapGetters({
  isPlayerSelected: 'isAnyPlayerSelected',
  player: 'selectedPlayer',
});

const state = {
  ...adaptedState,
};

export default state;
