<script lang="ts">
import Vue from 'vue';
import PlayerItem from './PlayerItem/PlayerItem.vue';

export default Vue.extend({
  name: 'PlayersList',
  components: {
    PlayerItem,
  },
});
</script>

<template>
  <div class="app-playersList">
    <player-item />
    <player-item />
    <player-item />
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
