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
        this.background = this.game.add.sprite(0,0, "background");
        this.background.anchor.set(0.5, 0.5);
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


