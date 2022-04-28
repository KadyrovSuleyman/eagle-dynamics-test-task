import { mapState } from 'vuex';

export interface Counter {
  online: number,
  total: number,
}

export const adaptedState = mapState({
  online: (state: any): number => (state as Counter).online,
  total: (state: any): number => (state as Counter).total,
});
