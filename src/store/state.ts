import { Player } from '@/types/player';
import mockedList from './__mocks__/list';

export const state = {
  playersList: [] as Player[],
  // playersList: mockedList as Player[],

  blackList: [] as string[],
  selectedPlayerIndex: -1,
};

export type StateT = typeof state;
