<script lang="ts">
import Vue from 'vue';
import PlayerItem from './PlayerItem/PlayerItem.vue';
import state from './state';
import handlers from './handlers';

export default Vue.extend({
  name: 'PlayersList',
  components: {
    PlayerItem,
  },
  computed: {
    ...state,
  },
  methods: {
    ...handlers,
  },
});
</script>

<template>
  <div class="app-playersList">
    <player-item
      v-for="player of list"
      :key="player.id"
      :avatar="player.avatar"
      :name="player.name"
      :status="player.status"
      :onclick="() => { select(player.id); }"
      :selected="selected ? selected.id === player.id : false"
    />

  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
