'use strict';

import * as C from '../constants';

/**
 * `PlayGame`
 * Main Phaser scene to play the game.
 */
class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');

    this.EG = {
      cursors: null,
      firstPlay: true,
    };
  }

  create() {
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
  }
}

export default PlayGame;
