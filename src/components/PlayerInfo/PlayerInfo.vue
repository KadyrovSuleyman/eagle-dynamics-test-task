<script lang="ts">
import Vue from 'vue';
import adaptedState from './state';

export default Vue.extend({
  name: 'PlayerItem',
  props: {
    id: String,
    status: String,
    name: String,
    avatar: String,
    description: String,
  },
  computed: {
    ...adaptedState,
  },
});
</script>

<template>
  <div v-if="!isPlayerSelected" class="app-playerInfoFallback">
    Select the player
  </div>

  <div v-else class="app-playerInfo">
    <div class="playerInfo-avatar">
      {{ avatar }}
    </div>
    <div class="playerInfo-name">
      {{ name }}
    </div>
    <div class="playerInfo-status">
      {{ status }}
    </div>
    <div v-if="description" class="playerInfo-description">
      {{ description }}
    </div>
    <div v-else class="playerInfo-emptyDescription">
      There is no description for this player
    </div>
    <button class="playerInfo-kickButton">
      Exclude
    </button>
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
