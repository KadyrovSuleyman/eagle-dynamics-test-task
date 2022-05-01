<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';

Vue.use(Vuex);

export default Vue.extend({
  name: 'TopPanel',

  computed: {
    ...state,
  },
});
</script>

<template>
  <div class="app-topPanel">
    <span class="topPanel-header">
      Список игроков
    </span>

    <div v-if="!total" class="topPanel-counterFallback">
      Нет зарегестрированных игроков
    </div>

    <div v-else class="topPanel-counter">
      <span class="counter-text">
        Подключено:
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
        игроков
      </span>
    </div>
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
