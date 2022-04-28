<script lang="ts">
import Vue from 'vue';
import PlayerItem from './PlayerItem/PlayerItem.vue';
import adaptedState from './state';

export default Vue.extend({
  name: 'PlayersList',
  components: {
    PlayerItem,
  },
  computed: {
    ...adaptedState,
  },
});
</script>

<template>
  <div v-if="!list.length" class="app-playersListFallback">
    There are no players yet
  </div>

  <div v-else class="app-playersList">
    <player-item
      v-for="player of list"
      :key="player.id"
      :avatar="player.avatar"
      :name="player.name"
      :status="player.status"
    />

  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
