<script lang="ts">
import Vue from 'vue';
import PlayerInfo from './components/PlayerInfo/PlayerInfo.vue';
import PlayersList from './components/PlayersList/PlayersList.vue';
import TopPanel from './components/TopPanel/TopPanel.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TopPanel,
    PlayersList,
    PlayerInfo,
  },
});
</script>

<template>
  <div id="app">
    <top-panel />
    <players-list />
    <player-info />
  </div>
</template>

<style lang="scss">
  @use 'sass' as *;
</style>
