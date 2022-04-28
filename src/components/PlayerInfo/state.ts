import { mapState } from 'vuex';

const adaptedState = mapState({
  isPlayerSelected: (state: any): boolean => state.selected,
});

export default adaptedState;
