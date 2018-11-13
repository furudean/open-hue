import { Tile } from '@/common/tile';
import { Color } from '@/types/color';
import { sleep } from '@/common/util';

export class GameTile extends Tile {
  public isHidden: boolean;
  public style: {[key: string]: string};

  constructor(color: Color, isLocked: boolean, index: number) {
    super(color, isLocked, index);

    this.isHidden = false;
    this.style = {
      background: color.toString(),
    };
  }

  public async hide(delay: number) {
    return this.setVisibility(true, delay);
  }

  public async show(delay: number) {
    return this.setVisibility(false, delay);
  }

  public async setVisibility(hidden: boolean, delay: number) {
    await sleep(delay);
    this.isHidden = hidden;
    await sleep(300); // wait for tween before resolving
  }
}
