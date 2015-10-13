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

    p.keyStates = {};

    p.keyboard = null;
    p.group = null;

    SpriteMovementSystem.UP = "up";
    SpriteMovementSystem.JUST_UP = "just_up";
    SpriteMovementSystem.DOWN = "down";
    SpriteMovementSystem.JUST_DOWN = "just_down";

    p.init_ = function(game)
    {
        console.log("[SpriteMovementSystem], init()");
        p = SpriteMovementSystem.prototype = new chongdashu.System(game);

        this.keyboard = p.state.game.input.keyboard;
        this.group = p.state.agentGroup;

        console.log(this.group);

        this.keyStates = {};

        this.keyStates[Phaser.Keyboard.W] = SpriteMovementSystem.UP;
        this.keyStates[Phaser.Keyboard.A] = SpriteMovementSystem.UP;
        this.keyStates[Phaser.Keyboard.S] = SpriteMovementSystem.UP;
        this.keyStates[Phaser.Keyboard.SPACEBAR] = SpriteMovementSystem.UP;

    };

    p.isJustDown = function(keycode) {
        return this.keyStates[keycode] && (this.keyStates[keycode] === SpriteMovementSystem.JUST_DOWN);
    };

    p.isDown = function(keycode) {
        return this.keyStates[keycode] && (this.isJustDown(keycode) || (this.keyStates[keycode] === SpriteMovementSystem.DOWN));
    };

    p.isJustUp = function(keycode) {
        return this.keyStates[keycode] && (this.keyStates[keycode] === SpriteMovementSystem.JUST_UP);
    };

    p.isUp = function(keycode) {
        return this.keyStates[keycode] && (this.isJustUp(keycode) || (this.keyStates[keycode] === SpriteMovementSystem.UP));
    };

    p.addSprite = function(sprite) {
        this.sprites.push(sprite);
    };

    p.update = function() {
        // console.log("[SpriteMovementSystem], update()");
        p.update.call(this);
        $.each(p.components, function(index, component) {
            component.update();
        });

        this.updateGroup();
        this.updateKeyStates();
        
    };

    p.updateGroup = function() {
        var self = this;
        if (this.group) {
            this.group.forEach(function(sprite) {
                if (self.isJustDown(Phaser.Keyboard.W)) {
                    sprite.body.velocity.y = -GLOBAL_JUMP_SPEED;
                }
            }, this);
        }
    };

    p.updateKeyStates = function() {
        var self = this;

        if (this.keyboard) {
            $.each(this.keyStates, function(key, state) {
                if (self.keyboard.isDown(key)) {
                    if (state == SpriteMovementSystem.JUST_UP || state == SpriteMovementSystem.UP) {
                        self.keyStates[key] = SpriteMovementSystem.JUST_DOWN;
                    }
                    else {
                        self.keyStates[key] = SpriteMovementSystem.DOWN;
                    }
                }
                else if (!self.keyboard.isDown(key)) {
                    if (state == SpriteMovementSystem.JUST_DOWN || state == SpriteMovementSystem.DOWN) {
                        self.keyStates[key] = SpriteMovementSystem.JUST_UP;
                    }
                    else {
                        self.keyStates[key] = SpriteMovementSystem.UP;
                    }
                }
            });
        }
    };

    p.render = function() {
        // console.log("[SpriteMovementSystem], render()");
        p.render.call(this);
    };
    

// Link
// ----
chongdashu.SpriteMovementSystem = SpriteMovementSystem;

}());


