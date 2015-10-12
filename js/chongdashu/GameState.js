/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * GameState
 * @class GameState
 * @constructor
 **/
var GameState = function(game) {
};
var p = GameState.prototype;

    p.prototypes = null;
    p.dataIndex = 0;
    
    // @phaser
    p.preload = function() {
       
    };

    // @phaser
    p.create = function() {
        this.createGroups();
        this.createBackground();
        this.createGround();
        this.createDebug();
    };

    p.createGroups = function() {
        this.backgroundGroup = this.game.add.group();
        this.groundGroup = this.game.add.group();
    };

    p.createBackground = function() {
        this.background = this.backgroundGroup.create(0,0, "background");
        this.background.anchor.set(0.5, 0.5);
    };

    p.createGround = function() {
        var x = 0;
        var y = GLOBAL_GAME_HEIGHT/2 - GLOBAL_TILE_HEIGHT/2;

        var tile = null;
        for (x=0; x < GLOBAL_GAME_WIDTH/GLOBAL_TILE_WIDTH; x++) {
            tile = this.groundGroup.create(-GLOBAL_GAME_WIDTH/2 + GLOBAL_TILE_WIDTH/2 + x*GLOBAL_TILE_WIDTH, y, "tile-brown");
            tile.anchor.set(0.5, 0.5);
        }
    };

    p.createDebug = function() {
        // Create a bitmap the same size as the stage
        var bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        
        // These functions use the canvas context to draw lines using the canvas API
        for(var y = this.game.height-GLOBAL_TILE_HEIGHT; y >= 0; y -= GLOBAL_TILE_HEIGHT) {
            bitmap.context.beginPath();
            bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            bitmap.context.moveTo(0, y);
            bitmap.context.lineTo(this.game.width, y);
            bitmap.context.stroke();
        }

        this.game.add.image(-GLOBAL_GAME_WIDTH/2, -GLOBAL_GAME_HEIGHT/2, bitmap);
    };

    // @phaser
    p.update = function() {
       
    };

    // render
    p.render = function() {
        pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
    };

    

// Link
// ----
chongdashu.GameState = GameState;

}());


