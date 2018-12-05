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
      speed: C.speedDefault,
      speedDisplay: null,
      countdown: 30,
      countdowEvent: null,
      countdownDisplay: null,
      planetEarth: null,
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

    this.add.image(C.gameWidth / 2, 180, 'planet-earth');

    this.anims.create({
      key: 'twinkle',
      frames: this.anims.generateFrameNames(
        'edwina-star',
        {
          frames: [0, 1, 2],
        }
      ),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'twinkle2',
      frames: this.anims.generateFrameNames(
        'edwina-star',
        {
          frames: [1, 0, 2],
        }
      ),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: C.playerAnimations.left.key,
      frames: this.anims.generateFrameNames(
        C.playerKey,
        {
          frames: C.playerAnimations.left.frames,
        }
      ),
      frameRate: C.playerAnimations.left.frameRate,
      repeat: C.playerAnimations.left.repeat,
    });

    this.anims.create({
      key: C.playerAnimations.straight.key,
      frames: [{
        key: C.playerKey,
        frame: C.playerAnimations.straight.frame,
      }],
      frameRate: C.playerAnimations.straight.frameRate,
    });

    this.anims.create({
      key: C.playerAnimations.right.key,
      frames: this.anims.generateFrameNames(
        C.playerKey,
        {
          frames: C.playerAnimations.right.frames,
        }
      ),
      frameRate: C.playerAnimations.right.frameRate,
      repeat: C.playerAnimations.right.repeat,
    });

    this.EG.player = this.impact.add.sprite(
      C.worldBoundsWidth / 2,
      C.worldBoundsHeight - (C.gameHeight / 2),
      C.playerKey
    ).setDepth(1);
    this.EG.player.setMaxVelocity(1000).setFriction(C.gameWidth, C.gameHeight).setPassiveCollision();

    const formatCountdown = (t) =>
      `00:${String(t).padStart(2, '0')}`;

    this.EG.countdownDisplay = this.add.text(
      10,
      10,
      formatCountdown(this.EG.countdown),
      {
        fontFamily: C.headerFontFamily,
        fontSize: '32px',
        fill: C.colors[0][0],
      },
    );
    this.EG.countdownDisplay.setScrollFactor(0);

    this.EG.speedDisplay = this.add.text(
      250,
      13,
      `Speed: ${this.EG.speed}`,
      {
        fontFamily: C.headerFontFamily,
        fontSize: '24px',
        fill: C.colors[0][0],
      },
    );
    this.EG.speedDisplay.setScrollFactor(0);

    this.EG.cursors = this.input.keyboard.createCursorKeys();

    const handleCountdown = () => {
      this.EG.countdown = (this.EG.countdown > 0) ? this.EG.countdown - 1 : 0;
      this.EG.countdownDisplay.setText(formatCountdown(this.EG.countdown));
    };

    this.EG.countdowEvent = this.time.addEvent({
      delay: 1000,
      callback: handleCountdown,
      callbackScope: this,
      repeat: 30,
    });
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
    if (this.EG.player.y < this.EG.endPoint || this.EG.countdown <= 0) {
      this.EG.speed = 0;
      this.EG.player.setAccelerationY(this.EG.speed);
      this.EG.speedDisplay.setText(`Speed: ${this.EG.speed}`);

      // Player has reached the end point of the race, so stop the game.
      this.scene.pause();
    } else {
      // Default acceleration.
      this.EG.player.setAccelerationY(-this.EG.speed);

      //  Position the center of the camera on the player.
      this.cameras.main.scrollY = this.EG.player.y - this.EG.viewportCenter.y;
    }

    if (this.EG.cursors.left.isDown) {
      this.EG.player.flipX = true;
      this.EG.player.setVelocityX(-this.EG.speed);
      this.EG.player.anims.play(C.playerAnimations.left.key, true);
    } else if (this.EG.cursors.right.isDown) {
      this.EG.player.flipX = false;
      this.EG.player.setVelocityX(this.EG.speed);
      this.EG.player.anims.play(C.playerAnimations.right.key, true);
    } else {
      this.EG.player.setVelocityX(0);
      this.EG.player.anims.play(C.playerAnimations.straight.key, true);
    }

    // Pickup a present to increase speed.

    // Avoid the monsters that slow down your speed.

    // Reach end point before the timer expires.

    this.EG.starfield.children.entries
      .filter(child => child.texture.key === 'edwina-star')
      .map((edwinaStar, index) => {
        if (index % 2 === 0) { 
          edwinaStar.anims.play('twinkle', true);
        } else {
          edwinaStar.anims.play('twinkle2', true);
        }
      });
  }
}

export default PlayGame;
