import { mount, Wrapper } from '@vue/test-utils';
import STATUS from '@/types/status';
import Vue from 'vue';
import PlayerItemVue from '../PlayerItem.vue';

const data = {
  id: 'we0m',
  avatar: 'avatar',
  name: 'name',
  status: STATUS.OFFLINE,
};

const newData = {
  id: 'we1m',
  avatar: 'new avatar',
  name: 'new name',
  status: STATUS.ONLINE,
};

let wrapper: Wrapper<Vue>;
beforeEach(() => {
  wrapper = mount(PlayerItemVue);
});

it('renders', async () => {
  await wrapper.setProps(data);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props change', async () => {
  await wrapper.setProps(data);
  expect(wrapper.find('img').attributes('src')).toBe(data.avatar);
  expect(wrapper.find('.playerItem-name').text()).toBe(data.name);
  expect(wrapper.find('.playerItem-status').text()).toBe('Вышел');

  await wrapper.setProps(newData);
  expect(wrapper.find('img').attributes('src')).toBe(newData.avatar);
  expect(wrapper.find('.playerItem-name').text()).toBe(newData.name);
  expect(wrapper.find('.playerItem-status').text()).toBe('Подключен');
});

it('reflect status to classes', async () => {
  expect(wrapper.find('.playerItem-status').text()).toBe('Вышел');
  expect(wrapper.find('.playersList-playerItem').classes()).toEqual([
    'playersList-playerItem',
  ]);

  await wrapper.setProps(data);
  expect(wrapper.find('.playerItem-status').text()).toBe('Вышел');
  expect(wrapper.find('.playersList-playerItem').classes()).toEqual([
    'playersList-playerItem',
    `playersList-playerItem__status_${data.status}`,
  ]);

  await wrapper.setProps(newData);
  expect(wrapper.find('.playerItem-status').text()).toBe('Подключен');
  expect(wrapper.find('.playersList-playerItem').classes()).toEqual([
    'playersList-playerItem',
    `playersList-playerItem__status_${newData.status}`,
  ]);
});
