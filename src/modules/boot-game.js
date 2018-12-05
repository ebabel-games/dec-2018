'use strict';

/**
 * `BootGame`
 * First Phaser scene, to preload all assets.
 */
class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame');
  }

  // Phaser function to preload all assets.
  preload() {
    // Graphics.
    this.load.image('star', 'assets/small-star.svg');
    this.load.image('big-star', 'assets/big-star.svg');
    this.load.image('ship', 'assets/spaceship.svg');
    this.load.image('planet-earth', 'assets/planet-earth.svg');
    this.load.spritesheet(
      'edwina-star',
      'assets/edwina-star.svg',
      { frameWidth: 32, frameHeight: 32 },
    );
  }

  // Phaser function, here used to activate the play button once the preload has completed its work.
  create() {
    document.getElementById('play-button').addEventListener('click', (e) => {
      e.preventDefault();

      // Hide the loading screen when the player clicks on the enabled Play button.
      document.getElementById('loading').style.display = 'none';

      // Hide the install banner.
      document.getElementById('install-banner').style.display = 'none';

      // Display the canvas.
      document.querySelector('body > canvas').style.display = 'block';

      this.scene.start('PlayGame');
    });

    // Game has finished loading all assets, so it's possible to start playing.
    document.getElementById('play-button').disabled = false;
    document.getElementById('loading-animation').style.display = 'none';
  }
}

export default BootGame;
