<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import { adaptedState } from './state';

Vue.use(Vuex);

export default Vue.extend({
  name: 'TopPanel',

  computed: {
    ...adaptedState,
  },
});
</script>

<template>
  <div class="app-topPanel">
    <span class="topPanel-header">
      Welcome to the Players List!
    </span>
    <div class="topPanel-counter">
      <span class="counter-text">
        Online:
      </span>
      <span class="counter-online">
        {{ online }}
      </span>
      <span class="counter-separator">
        /
      </span>
      <span class="counter-total">
        {{ total }}
      </span>
      <span class="counter-explanation">
        players
      </span>
    </div>
  </div>
</template>
