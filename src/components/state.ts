import { mapGetters } from 'vuex';

const adaptedGetters = mapGetters({
  isAtLeastOnePlayer: 'isAtLeastOnePlayer',
});

const state = {
  ...adaptedGetters,
};

export default state;
