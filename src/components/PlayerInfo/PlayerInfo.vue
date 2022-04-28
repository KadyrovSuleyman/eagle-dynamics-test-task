<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PlayerItem',
  components: {
  },
});
</script>

<template>
  <div class="app-playerInfo">
    <div class="playerInfo-avatar">
      Avatar will be here
    </div>
    <div class="playerInfo-nickname">
      Nickname
    </div>
    <div class="playerInfo-status">
      Online
    </div>
    <div class="playerInfo-text">
      Information about player
    </div>
    <button class="playerInfo-kickButton">
      Exclude
    </button>
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
