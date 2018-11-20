'use strict';

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

  // Starfield background.
  // Note: the scrollFactor values create the 'parallax' effect.
  // Source: http://labs.phaser.io/edit.html?src=src\games\defenda\test.js
  createStarfield () {
    const group = this.add.group({ key: 'star', frameQuantity: 256 });
    group.createMultiple({ key: 'big-star', frameQuantity: 32 });

    const rect = new Phaser.Geom.Rectangle(0, 0, 367, 2000);
    Phaser.Actions.RandomRectangle(group.getChildren(), rect);

    group.children.iterate((child) => {
      let sf = Math.max(0.3, Math.random());
      if (child.texture.key === 'big-star') sf = 0.2;
      child.setScrollFactor(sf);
    }, this);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 367, 2000);

    this.createStarfield();

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
  }
}

export default PlayGame;
