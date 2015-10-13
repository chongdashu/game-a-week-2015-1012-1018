/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * SpriteMovementSystem
 * @class SpriteMovementSystem
 * @constructor
 **/
var SpriteMovementSystem = function(game) {
    this.init_(game);
};
var p = SpriteMovementSystem.prototype = chongdashu.System;
SpriteMovementSystem.prototype.constructor = SpriteMovementSystem;
    
    p.components = [];

    p.init_ = function(game)
    {
        console.log("[SpriteMovementSystem], init()");
        p = new chongdashu.System(game);
    };

    p.update = function() {
        // console.log("[SpriteMovementSystem], update()");
        p.update.call(this);
    };

    p.render = function() {
        // console.log("[SpriteMovementSystem], render()");
        p.render.call(this);
    };
    

// Link
// ----
chongdashu.SpriteMovementSystem = SpriteMovementSystem;

}());


