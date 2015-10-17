var game = null;

var GLOBAL_GAME_WIDTH = 320;
var GLOBAL_GAME_HEIGHT = 240;

var GLOBAL_SCREEN_WIDTH = 640;
var GLOBAL_SCREEN_HEIGHT = 480;

var GLOBAL_TILE_WIDTH = 32;
var GLOBAL_TILE_HEIGHT = 32;

var GLOBAL_GRAVITY = 1000;
var GLOBAL_JUMP_SPEED = 300;
var GLOBAL_MOVEMENT_SPEED = 250;
var GLOBAL_SCALE = GLOBAL_SCREEN_WIDTH/GLOBAL_GAME_WIDTH;

var data = {};
var pixel = { scale: GLOBAL_SCALE, canvas: null, context: null, width: 0, height: 0 };

var tmp;

$(document).ready(function() {
    
    // Create the phaser context.
    // --------------------------
    // for retro, always use Phaser.CANVAS
    // http://www.photonstorm.com/phaser/pixel-perfect-scaling-a-phaser-game
    game = new Phaser.Game(GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT, Phaser.CANVAS, "", null, false, false);

    // Add all states.
    // ---------------
    game.state.add("BootState", chongdashu.BootState);
    game.state.add("PreloadState", chongdashu.PreloadState);
    game.state.add("GameState", chongdashu.GameState);
    game.state.add("MenuState", chongdashu.MenuState);

    // Start with boot sequence.
    // -------------------------
    game.state.start("BootState");

});
