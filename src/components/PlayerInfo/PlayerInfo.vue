<script lang="ts">
import Vue from 'vue';
import state from './state';
import actions from './handlers';

export default Vue.extend({
  name: 'PlayerItem',
  computed: {
    ...state,
  },
  methods: {
    ...actions,
  },
});
</script>

<template>
  <div v-if="!isPlayerSelected" class="app-playerInfoFallback">
    Select the player
  </div>

  <div v-else class="app-playerInfo">
    <div class="playerInfo-avatar">
      <img class="playerInfo-img" :src="player.avatar" :alt="player.name">
    </div>
    <div class="playerInfo-name">
      {{ player.name }}
    </div>
    <div :class="[
    'playerInfo-status',
    `playerInfo-status__${player.status}`,
    ]">
      {{ player.status }}
    </div>
    <div v-if="player.description" class="playerInfo-description">
      {{ player.description }}
    </div>
    <div v-else class="playerInfo-emptyDescription">
      There is no description for this player
    </div>
    <button
      @click="() => ban(player.id)"
      class="playerInfo-kickButton"
    >
      Exclude
    </button>
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
