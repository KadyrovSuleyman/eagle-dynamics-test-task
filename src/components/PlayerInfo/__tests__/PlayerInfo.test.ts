import { mount, Wrapper, createLocalVue } from '@vue/test-utils';
import STATUS from '@/types/status';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { Player } from '@/types/player';
import PlayerInfoVue from '../PlayerInfo.vue';

jest.mock('../state.ts');
jest.mock('../handlers.ts');

const data = {
  id: 'we0m',
  avatar: 'avatar',
  name: 'name',
  status: STATUS.OFFLINE,
  description: 'description',
};

const newData = {
  id: 'we1m',
  avatar: 'new avatar',
  name: 'new name',
  status: STATUS.ONLINE,
  description: 'new description',
};

let store: Store<{
  selected: boolean,
  player: Player,
}>;

const actions = {
  ban: jest.fn(),
};

beforeEach(() => {
  store = new Vuex.Store({
    state: {
      selected: true,
      player: {
        ...data,
      },
    },
    mutations: {
      changeSelectionState: () => { store.state.selected = !store.state.selected; },
    },
    actions,
  });
});

const localVue = createLocalVue();
localVue.use(Vuex);
let wrapper: Wrapper<Vue>;
beforeEach(() => {
  wrapper = mount(PlayerInfoVue, { localVue, store });
});

// ===============================
it('renders', async () => {
  await wrapper.setProps(data);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props change', async () => {
  store.state.player = {
    ...data,
  };
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();

  store.state.player = {
    ...newData,
  };
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('detect empty description', async () => {
  store.state.player = {
    ...data,
  };
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.playerInfo-description').text()).toBe(data.description);
  expect(wrapper.find('.playerInfo-emptyDescription').exists()).toBeFalsy();

  store.state.player = {
    ...newData,
    description: undefined,
  };
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.playerInfo-description').exists()).toBeFalsy();
  expect(wrapper.find('.playerInfo-emptyDescription').text())
    .toBe('У этого игрока нет описания');
});

it('watchs outer store', async () => {
  expect(store.state.selected).toBeTruthy();
  expect(wrapper.find('.app-playerInfo').exists()).toBeTruthy();
  expect(wrapper.find('.app-playerInfoFallback').exists()).toBeFalsy();

  store.commit('changeSelectionState');
  await wrapper.vm.$nextTick();
  expect(store.state.selected).toBeFalsy();
  expect(wrapper.find('.app-playerInfo').exists()).toBeFalsy();
  expect(wrapper.find('.app-playerInfoFallback').exists()).toBeTruthy();
});

it('exclude button click triggers his callback', async () => {
  expect(actions.ban).toBeCalledTimes(0);

  await wrapper.find('.playerInfo-kickButton').trigger('click');
  expect(actions.ban).toBeCalledTimes(1);
  expect(actions.ban.mock.calls[0][1]).toBe(data.id);
});
