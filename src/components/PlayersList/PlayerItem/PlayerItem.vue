<script lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
import Vue from 'vue';

export default Vue.extend({
  name: 'PlayerItem',
  props: {
    id: String,
    status: String,
    name: String,
    avatar: String,
    onclick: {
      type: Function,
      default: () => ({}),
    },
    selected: Boolean,
  },
});
</script>

<template>
  <div
    :class="[
      'playersList-playerItem',
      `${status ? `playersList-playerItem__status_${status}` : ''}`,
      `${selected ? 'playersList-playerItem__selected' : ''}`,
    ]"
    @click="onclick"
  >
    <div class="playerItem-avatar">
      <img class="playerItem-img" :src="avatar" :alt="name"/>
    </div>
    <div class="playerItem-name">
      {{ name }}
    </div>
    <div class="playerItem-status">
      {{ status === 'online'
          ? 'Подключен'
          : 'Вышел'
        }}
    </div>
  </div>
</template>

<style lang="scss">
@use 'styles' as *;
</style>
