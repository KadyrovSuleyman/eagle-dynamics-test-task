<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PlayerItem',
  props: {
    id: String,
    status: String,
    name: String,
    avatar: String,
  },
});
</script>

<template>
  <div
    :class="[
      'playersList-playerItem',
      `${status ? `playersList-playerItem__status_${status}` : ''}`,
    ]"
  >
    <div class="playerItem-avatar">
      {{ avatar }}
    </div>
    <div class="playerItem-name">
      {{ name }}
    </div>
    <div class="playerItem-status">
      {{ status }}
    </div>
  </div>
</template>

<style lang="scss">
@use 'styles' as *;
</style>
