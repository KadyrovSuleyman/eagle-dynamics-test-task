<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PlayerItem',
  components: {
  },
});
</script>

<template>
  <div class="playersList-playerItem">
    <div class="playerItem-avatar">
      Avatar will be here
    </div>
    <div class="playerItem-nickname">
      Nickname
    </div>
    <div class="playerItem-status">
      Online
    </div>
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
