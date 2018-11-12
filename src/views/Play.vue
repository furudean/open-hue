<template>
  <div class="game-container">
    <Board board="board" tile-moved-fn="onTileMoved"></Board>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from '@/components/Board.vue';

@Component({
  components: {
    Board,
  }
})
export default class Play extends Vue {}
</script>
