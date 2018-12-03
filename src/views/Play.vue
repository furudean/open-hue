<template>
  <div class="game-container">
    <Board :board="board"></Board>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from '@/components/Board.vue';
import { templates } from '@/common/levelTemplate';
import { GameTile } from '@/common/gameTile';
import { GameBoard } from '@/common/gameBoard';
import { sleep } from '@/common/util';

const template = templates[0];
const notLockedFilter = (tile: GameTile) => !tile.isLocked;
const delay = 40;

const board = new GameBoard(template);

async function init() {
  await sleep(2000);
  await board.hide(delay, notLockedFilter);
  board.shuffle();
  board.show(delay, notLockedFilter);
}

@Component({
  components: {
    Board,
  },
  data: () => ({
    board,
  }),
})
export default class Play extends Vue {}
</script>
