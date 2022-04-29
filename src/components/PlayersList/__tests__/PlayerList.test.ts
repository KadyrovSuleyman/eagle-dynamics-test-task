import Vuex, { Store } from 'vuex';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import { Player } from '@/types/player';
import mockedList from '../../../store/__mocks__/list';
import PlayersListVue from '../PlayersList.vue';

jest.mock('../state.ts');

let store: Store<{ list: Player[] }>;
beforeEach(() => {
  store = new Vuex.Store({
    state: {
      list: mockedList,
    },
    mutations: {
      deleteLast: () => { store.state.list.pop(); },
      modifyFirst: () => {
        store.state.list[0].id = 'id';
        store.state.list[0].name = 'name';
        store.state.list[0].avatar = 'avatar';
        store.state.list[0].description = 'description';
        store.state.list[0].status = 'status';
      },
    },
  });
});

const localVue = createLocalVue();
localVue.use(Vuex);
let wrapper: Wrapper<Vue>;
beforeEach(() => {
  wrapper = mount(PlayersListVue, { localVue, store });
});

it('renders filled list', () => {
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('renders empty list', async () => {
  store.state.list = [];
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

describe('watchs outer store', () => {
  it('modify some players data', async () => {
    expect(wrapper.findAll('.playersList-playerItem').length).toBe(mockedList.length);
    expect(wrapper.findAll('.playersList-playerItem').at(0)).toMatchSnapshot();

    store.commit('modifyFirst');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.playersList-playerItem').at(0)).toMatchSnapshot();
  });

  it('modify players list itself', async () => {
    const { length } = mockedList;
    expect(wrapper.findAll('.playersList-playerItem').length).toBe(length);
    expect(wrapper.element.outerHTML).toMatchSnapshot();

    store.commit('deleteLast');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.playersList-playerItem').length).toBe(length - 1);
    expect(wrapper.element.outerHTML).toMatchSnapshot();
  });
});
