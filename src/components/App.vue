<script lang="ts">
import Vue from 'vue';
import PlayerInfo from './PlayerInfo/PlayerInfo.vue';
import PlayersList from './PlayersList/PlayersList.vue';
import TopPanel from './TopPanel/TopPanel.vue';
import state from './state';

export default Vue.extend({
  name: 'App',
  components: {
    TopPanel,
    PlayersList,
    PlayerInfo,
  },
  computed: {
    ...state,
  },
});
</script>

<template>
  <div id="app">
    <top-panel />
    <players-list v-if="isAtLeastOnePlayer" />
    <player-info  v-if="isAtLeastOnePlayer"/>
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
