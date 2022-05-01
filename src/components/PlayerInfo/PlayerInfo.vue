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
    Выберите игрока
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
      {{ player.status === 'online'
          ? 'Подключен'
          : 'Вышел'
       }}
    </div>
    <div v-if="player.description" class="playerInfo-description">
      {{ player.description }}
    </div>
    <div v-else class="playerInfo-emptyDescription">
      У этого игрока нет описания
    </div>
    <button
      @click="() => ban(player.id)"
      class="playerInfo-kickButton"
    >
      Исключить
    </button>
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
