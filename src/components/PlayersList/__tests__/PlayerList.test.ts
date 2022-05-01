import Vuex, { Store } from 'vuex';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import { Player } from '@/types/player';
import mockedList from '../../../store/__mocks__/list';
import PlayersListVue from '../PlayersList.vue';

jest.mock('../state.ts');
jest.mock('../handlers.ts');

const actions = {
  select: jest.fn(),
};

let store: Store<{ list: Player[] }>;
beforeEach(() => {
  store = new Vuex.Store({
    state: {
      // list: mockedList.map((item) => ({
      //   ...item,
      //   selected: false,
      // })),
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
    actions,
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

it('triggers onclick func', async () => {
  expect(actions.select).toBeCalledTimes(0);

  await wrapper.findAll('.playersList-playerItem').at(0).trigger('click');
  expect(actions.select).toBeCalledTimes(1);
  expect(actions.select.mock.calls[0][1]).toBe(store.state.list[0].id);

  await wrapper.findAll('.playersList-playerItem').at(1).trigger('click');
  expect(actions.select).toBeCalledTimes(2);
  expect(actions.select.mock.calls[1][1]).toBe(store.state.list[1].id);
});
