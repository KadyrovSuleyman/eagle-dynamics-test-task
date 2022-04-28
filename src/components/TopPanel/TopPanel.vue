<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TopPanel',
});
</script>

<template>
  <div id="app-topPanel">
    <span class="topPanel-header">
      Welcome to the Players List!
    </span>
    <div class="topPanel-counter">
      <span class="counter-text">
        Online:
      </span>
      <span class="counter-online">
        10
      </span>
      <span class="counter-separator">
        /
      </span>
      <span class="counter-total">
        100
      </span>
      <span class="counter-explanation">
        players
      </span>
    </div>
  </div>
</template>
