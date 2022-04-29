import { Wrapper, createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import AppVue from '../App.vue';

jest.mock('../state.ts');

let store: Store<{ isAtLeastOnePlayer: boolean }>;
beforeEach(() => {
  store = new Vuex.Store({
    state: {
      isAtLeastOnePlayer: true,
    },
    mutations: {
      change: () => {
        store.state.isAtLeastOnePlayer = !store.state.isAtLeastOnePlayer;
      },
    },
  });
});

const localVue = createLocalVue();
localVue.use(Vuex);
let wrapper: Wrapper<Vue>;
beforeEach(() => {
  wrapper = shallowMount(AppVue, { localVue, store });
});

// ===============================
it('renders', async () => {
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs outer store', async () => {
  expect(store.state.isAtLeastOnePlayer).toBeTruthy();
  expect(wrapper.element.outerHTML).toMatchSnapshot();

  store.commit('change');
  await wrapper.vm.$nextTick();
  expect(store.state.isAtLeastOnePlayer).toBeFalsy();
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});
