<template>
<div class="board" v-bind:style="board.style">
  <Tile v-repeat="tile in board.tiles" index="index" tile="tile"></Tile>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GameBoard } from '@/common/gameBoard';

// function onDrop(i: number, tile0: Tile) {
//   const tiles = null;
//   const j = tiles.indexOf(tile0); // find the other index using dragged tile
//   const tile1 = tiles[i]; // find the other tile using the dragged tile index

//   console.debug({i, j, tile0, tile1, tiles});

//   tiles[i] = tile0;
//   tiles[j] = tile1;
// }

@Component
export default class DisplayBoard extends Vue {
  @Prop() private board!: GameBoard;
}
</script>

<style scoped lang="scss">
.game-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  box-sizing: border-box;
  padding: 20px;
}

board {
  display: block;
  position: relative;
  width: 600px;
  height: 100%;
}

.board {
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
