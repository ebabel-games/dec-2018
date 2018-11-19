'use strict';

// Color palette. For more info, see /COLOR_PALETTE.md documentation.
const colors = [
  ['#57BFDC', '#B5E8F6', '#80D3EA', '#35A9CA', '#1591B4'],  // Primary color.
  ['#667EE1', '#BCC8F8', '#8C9FED', '#4661D2', '#2644C0'],  // Secondary color (1).
  ['#FFCF60', '#FFEAB9', '#FFDB88', '#FFC53D', '#FFB916'],  // Secondary color (2).
  ['#FFB060', '#FFDCB9', '#FFC488', '#FF9F3D', '#FF8C16'],  // Complement color.
];

const colors0x = [
  [0x57BFDC, 0xB5E8F6, 0x80D3EA, 0x35A9CA, 0x1591B4],  // Primary color.
  [0x667EE1, 0xBCC8F8, 0x8C9FED, 0x4661D2, 0x2644C0],  // Secondary color (1).
  [0xFFCF60, 0xFFEAB9, 0xFFDB88, 0xFFC53D, 0xFFB916],  // Secondary color (2).
  [0xFFB060, 0xFFDCB9, 0xFFC488, 0xFF9F3D, 0xFF8C16],  // Complement color.
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
