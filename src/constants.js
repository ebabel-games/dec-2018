'use strict';

// Color palette. For more info, see /COLOR_PALETTE.md documentation.
const colors = [
  ['#58BBDC', '#B6E6F7', '#81D0EA', '#36A6CB', '#168DB5'],  // Primary color.
  ['#FFD060', '#FFEBB9', '#FFDC88', '#FFC63D', '#FFBB16'],  // Secondary color (1).
  ['#FF7960', '#FFC4B9', '#FF9A88', '#FF5B3D', '#FF3A16'],  // Secondary color (2).
];

const colors0x = [
  [0x58BBDC, 0xB6E6F7, 0x81D0EA, 0x36A6CB, 0x168DB5],  // Primary color.
  [0xFFD060, 0xFFEBB9, 0xFFDC88, 0xFFC63D, 0xFFBB16],  // Secondary color (1).
  [0xFF7960, 0xFFC4B9, 0xFF9A88, 0xFF5B3D, 0xFF3A16],  // Secondary color (2).
];

const debug = (localStorage['debug'] === 'true') ? true : false;

module.exports = {
  debug,

  scoreDefault: 0,
  scoreCollectStar: 10,

  // The game saves performance by not running code until it stops getting called for at least x milliseconds.
  debounceDelay: 250,

  // The game needs the player to notice something and will not run for x milliseconds.
  minimumDelay: 1500,

  colors,
  colors0x,

  headerFontFamily: '\'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif',

  gameWidth: 375,
  gameHeight: 667,
  gravity: 300,

  // World bounds can be greater than canvas gameWidth and gameHeight,
  // so the camera can move to new areas beyond the initial screen area.
  worldBoundsWidth: 375,
  worldBoundsHeight: 667,
};
