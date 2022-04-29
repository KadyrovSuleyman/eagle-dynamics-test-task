import { mapState } from 'vuex';

const adaptedState = mapState({
  isAtLeastOnePlayer: (state: any): boolean => state.isAtLeastOnePlayer,
});

export default adaptedState;
