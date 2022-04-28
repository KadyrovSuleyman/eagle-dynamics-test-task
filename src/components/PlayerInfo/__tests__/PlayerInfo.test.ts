import { mount, Wrapper, createLocalVue } from '@vue/test-utils';
import STATUS from '@/types/status';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import PlayerInfoVue from '../PlayerInfo.vue';

jest.mock('../state.ts');

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

let store: Store<{ selected: boolean }>;
beforeEach(() => {
  store = new Vuex.Store({
    state: {
      selected: true,
    },
    mutations: {
      changeSelectionState: () => { store.state.selected = !store.state.selected; },
    },
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
  await wrapper.setProps(data);
  expect(wrapper.element.outerHTML).toMatchSnapshot();

  await wrapper.setProps(newData);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('detect empty description', async () => {
  await wrapper.setProps(data);
  expect(wrapper.find('.playerInfo-description').text()).toBe(data.description);
  expect(wrapper.find('.playerInfo-emptyDescription').exists()).toBeFalsy();

  await wrapper.setProps({
    ...data,
    description: undefined,
  });
  expect(wrapper.find('.playerInfo-description').exists()).toBeFalsy();
  expect(wrapper.find('.playerInfo-emptyDescription').text())
    .toBe('There is no description for this player');
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
