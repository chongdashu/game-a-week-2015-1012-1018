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

    p.doJump = false;

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
        this.keyStates[Phaser.Keyboard.D] = SpriteMovementSystem.UP;
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


        this.updateKeyStates();
        this.updateGroup();
    };

    p.updateGroup = function() {
        var self = this;
        if (this.group) {
            this.group.forEach(function(sprite) {
                
                if (self.isDown(Phaser.Keyboard.W) && !self.isJustDown(Phaser.Keyboard.W)) {
                    
                    if (self.doJump) {
                        console.log(sprite.anchor);
                        var squashTween = p.game.add.tween(sprite.scale).to({
                            x: 1.25,
                            y: 0.75
                        }, 125, Phaser.Easing.Exponential.Out, true);

                        squashTween.onComplete.add(function() {
                            sprite.body.allowGravity = true;
                            sprite.anchor.set(0.5, 0.5);
                            sprite.position.y -= 32;
                            sprite.body.velocity.y = -GLOBAL_JUMP_SPEED;
                            var squeezeTween = p.game.add.tween(sprite.scale).to({
                                x: 0.7,
                                y: 1.25
                            }, 100, Phaser.Easing.Exponential.InOut, true);

                            squeezeTween.onComplete.add(function() {
                                sprite.anchor.set(0.5, 0.5);
                                sprite.scale.set(1,1);
                            });
                        });
                        self.doJump =false;
                    }
                   
                }

                if (self.isJustDown(Phaser.Keyboard.W)) {
                    
                    if (!self.doJump) {
                        sprite.anchor.set(0.5, 1);
                        sprite.position.y += 32;
                        sprite.update();
                        sprite.body.allowGravity = false;
                        self.doJump = true;
                    }
                }
                

                if (self.isDown(Phaser.Keyboard.A)) {
                    sprite.body.velocity.x = -GLOBAL_MOVEMENT_SPEED;
                }
                if (self.isDown(Phaser.Keyboard.D)) {
                    sprite.body.velocity.x = GLOBAL_MOVEMENT_SPEED;
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
        p.game.debug.spriteInfo(p.state.player, 16, 16);
        p.game.debug.body(p.state.player);
        // p.game.debug.bodyInfo(p.state.player, 16, 16);
    };
    

// Link
// ----
chongdashu.SpriteMovementSystem = SpriteMovementSystem;

}());


