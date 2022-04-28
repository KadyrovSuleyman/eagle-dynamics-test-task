import Vuex, { Store } from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';
import TopPanelVue from '../TopPanel.vue';

jest.mock('../state.ts');

const localVue = createLocalVue();
localVue.use(Vuex);

let store: Store<unknown>;
beforeEach(() => {
  store = new Vuex.Store({
    state: {
      online: 10,
      total: 100,
    },
    mutations: {
      change: (state) => {
        state.online = 7;
        state.total = 50;
      },
    },
  });
});

it('renders', () => {
  const wrapper = mount(TopPanelVue, { localVue, store });
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs outer store', async () => {
  const wrapper = mount(TopPanelVue, { localVue, store });
  expect(wrapper.exists()).toBeTruthy();
  expect(wrapper.find('.counter-online').text()).toBe('10');
  expect(wrapper.find('.counter-total').text()).toBe('100');

  store.commit('change');
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.counter-online').text()).toBe('7');
  expect(wrapper.find('.counter-total').text()).toBe('50');
});
