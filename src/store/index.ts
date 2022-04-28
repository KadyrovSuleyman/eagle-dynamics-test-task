import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    online: 10,
    total: 100,
    selected: true,

    playerList: [
      {
        name: '🛦 Flying ℃omradE 🛦',
        id: 'we0m',
        avatar: 'dev/profiles/face1.jpg',
        description: '',
        status: 'online',
      },
      {
        name: '𝕯esperate 𝕭ℓⱭⅆe 𝕽unner',
        id: 'we1m',
        avatar: 'dev/profiles/face2.jpg',
        description: '',
        status: 'offline',
      },
    ],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
