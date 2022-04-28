import { mapState } from 'vuex';

const adaptedState = mapState({
  online: (state: any): number => state.online,
  total: (state: any): number => state.total,
});

export default adaptedState;
