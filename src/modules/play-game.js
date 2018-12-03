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
      player: null,
      starfield: null,
      endPoint: C.gameHeight / 2,
      viewportCenter: {
        x: C.gameWidth / 2,
        y: C.gameHeight / 2,
      },
      speed: 50,
    };
  }

  // Starfield background.
  // Note: the scrollFactor values create the 'parallax' effect.
  // Source: http://labs.phaser.io/edit.html?src=src\games\defenda\test.js
  createStarfield () {
    this.EG.starfield = this.add.group({ key: 'star', frameQuantity: 1280 });
    this.EG.starfield.createMultiple({ key: 'big-star', frameQuantity: 160 });
    this.EG.starfield.createMultiple({ key: 'edwina-star', frameQuantity: 9 });

    const rect = new Phaser.Geom.Rectangle(0, 0, C.worldBoundsWidth, C.worldBoundsHeight);
    Phaser.Actions.RandomRectangle(this.EG.starfield.getChildren(), rect);

    this.EG.starfield.children.iterate((child) => {
      let sf = Math.max(0.3, Math.random());
      if (child.texture.key === 'big-star') sf = 0.2;
      if (child.texture.key === 'edwina-star') sf = 0.3;
      child.setScrollFactor(sf);
    }, this);
  }

  create() {
    this.cameras.main.setBounds(0, 0, C.worldBoundsWidth, C.worldBoundsHeight);

    this.createStarfield();

    this.anims.create({
      key: 'twinkle',
      frames: this.anims.generateFrameNames(
        'edwina-star',
        {
          frames: [0, 1, 2],
        }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.EG.player = this.impact.add.sprite(
      C.worldBoundsWidth / 2,
      C.worldBoundsHeight - (C.gameHeight / 3),
      'ship'
    ).setDepth(1);
    this.EG.player.setMaxVelocity(1000).setFriction(C.gameWidth, C.gameHeight).setPassiveCollision();

    this.EG.cursors = this.input.keyboard.createCursorKeys();
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
    if (this.EG.player.y < this.EG.endPoint) {
      // Player has reached the end point of the race, so stop the game.
      this.scene.pause();
    } else {
      // Default acceleration.
      this.EG.player.setAccelerationY(-this.EG.speed);

      //  Position the center of the camera on the player.
      this.cameras.main.scrollY = this.EG.player.y - this.EG.viewportCenter.y;
    }

    // Pickup a present to increase speed.

    // Avoid the monsters that slow down your speed.

    // Reach end point before the timer expires.

    this.EG.starfield.children.entries
      .filter(child => child.texture.key === 'edwina-star')
      .map(edwinaStar => edwinaStar.anims.play('twinkle', true));
  }
}

export default PlayGame;
