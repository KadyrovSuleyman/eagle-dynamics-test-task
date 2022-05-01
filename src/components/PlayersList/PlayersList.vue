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
  // data() {
  //   console.log(state.selected);
  //   return {}
  // }
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
      :onclick="() => { select(player.id); }"
      :selected="selected ? selected.id === player.id : false"
    />

  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
