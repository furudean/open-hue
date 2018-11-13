import { Template } from '@/types/template';
import { GameTile } from './gameTile';
import * as gradient from '@/common/gradient';
import * as matrixParser from '@/common/matrixParser';
import { swapIndex } from '@/common/util';

export class GameBoard {
  get draggableTiles() {
    return this.tiles
      .map((tile) => tile.isLocked === false);
  }
  get lockedTiles() {
    return this.tiles
      .map((tile) => tile.isLocked === true);
  }

  public name: string;
  public style: {[key: string]: string};
  public tiles: GameTile[];
  public width: number;
  public height: number;

  constructor(template: Template) {
    const {topLeft, topRight, bottomLeft, bottomRight} = template.corners;
    const matrix = matrixParser.parse(template.map);
    const coloredMatrix = gradient.gradientize(matrix, topLeft, topRight, bottomLeft, bottomRight);
    const tiles = coloredMatrix.flat()
      .map(({color, isLocked}, index) => new GameTile(color, isLocked, index));

    this.width = matrix[0].length;
    this.height = matrix.length;
    this.tiles = tiles;
    this.name = template.name;
    this.style = {
      gridTemplateRows: `repeat(${this.height}, 1fr)`,
      gridTemplateColumns: `repeat(${this.width}, 1fr)`,
    };
  }

  public async hide(tweenTime: number, filterFn: (...args: any[]) => boolean) {
    return this.setHidden(true, tweenTime, filterFn);
  }

  public async show(tweenTime: number, filterFn: (...args: any[]) => boolean) {
    return this.setHidden(false, tweenTime, filterFn);
  }

  public isWin() {
    return this.tiles.every((tile, i) => tile.index === i);
  }

  public shuffle() {
    function shuffleIndices(array: GameTile[], which: number[], i = (which.length - 1)) {
      if (i > 0) {
        const j = Math.floor(Math.random() * (i + 1));
        const k = which[i];
        const l = which[j];

        swapIndex(array, k, l);
        shuffleIndices(array, which, --i);
      }
    }

    const indicesToShuffle = this.tiles
      .filter((tile) => tile.isLocked === false)
      .map((tile, i) => i);

    shuffleIndices(this.tiles, indicesToShuffle);
  }

  private async setHidden(hidden: boolean, delay: number, filterFn: (...args: any[]) => boolean = () => true) {
    const hiddenPromises = this.tiles.filter(filterFn)
      .map((tile, i) => tile.setVisibility(hidden, i * delay));
    return Promise.all(hiddenPromises);
  }
}
