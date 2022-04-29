import { mapGetters } from 'vuex';

const adaptedState = mapGetters({
  online: 'onlinePlayersNumber',
  total: 'totalPlayersNumber',
});

const state = {
  ...adaptedState,
};

export default state;
