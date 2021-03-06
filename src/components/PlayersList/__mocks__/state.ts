import { Player } from '@/types/player';
import { mapState } from 'vuex';

const adaptedState = mapState({
  list: (state: any): Player[] => state.list,
  selected: () => false,
});

export default adaptedState;
