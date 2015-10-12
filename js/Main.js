var game = null;

var GLOBAL_GAME_WIDTH = 320;
var GLOBAL_GAME_HEIGHT = 240;

var GLOBAL_SCREEN_WIDTH = 640;
var GLOBAL_SCREEN_HEIGHT = 480;

var data = {};
var pixel = { scale: GLOBAL_SCREEN_WIDTH/GLOBAL_GAME_WIDTH, canvas: null, context: null, width: 0, height: 0 };


$(document).ready(function() {
    
    // Create the phaser context.
    // --------------------------
    // for retro, always use Phaser.CANVAS
    // http://www.photonstorm.com/phaser/pixel-perfect-scaling-a-phaser-game
    game = new Phaser.Game(GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT, Phaser.CANVAS, "");

    // Add all states.
    // ---------------
    game.state.add("BootState", chongdashu.BootState);
    game.state.add("PreloadState", chongdashu.PreloadState);
    game.state.add("GameState", chongdashu.GameState);

    // Start with boot sequence.
    // -------------------------
    game.state.start("BootState");

});
