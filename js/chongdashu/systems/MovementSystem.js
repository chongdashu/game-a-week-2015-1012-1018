/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * MovementSystem
 * @class MovementSystem
 * @constructor
 **/
var MovementSystem = function(state) {
    this.init(state);
};
var p = chongdashu.Utils.extend(MovementSystem, chongdashu.System);

    p.keyStates = {};

    p.keyboard = null;
    p.group = null;

    p.doJump = false;

    p.leftDownAccum = 0;
    p.rightDownAccum = 0;

    p.init = function(state)
    {
        console.log("[MovementSystem], init()");
        this.System_init(state);

        this.addComponent(chongdashu.KeyboardComponent.TYPE);
        this.addComponent(chongdashu.AimingComponent.TYPE);
    };

    p.update = function(entity) {
        if (this.System_update(entity)) {
            var self = this;
            var sprite = entity;
            var kc = sprite.komponents[chongdashu.KeyboardComponent.TYPE];
            var ac = sprite.komponents[chongdashu.AimingComponent.TYPE];

            // note
            // used to be 350, but causes lag (See Bug #1)
            // ac.arrowReleaseTime > 0 will fix #1, but not sure what's best.
            if (!ac.arrow && this.game.time.time - ac.arrowReleaseTime > 50) {
                if (kc.isDown(Phaser.Keyboard.LEFT)) {
                    if (this.leftDownAccum >= 50) {
                        sprite.body.velocity.x = -GLOBAL_MOVEMENT_SPEED;
                        sprite.body.facingX = Phaser.LEFT;
                    }
                    else {
                        this.leftDownAccum += this.game.time.elapsed;
                    }
                    
                }
                if (kc.isDown(Phaser.Keyboard.RIGHT)) {
                    if (this.rightDownAccum >= 50) {
                        sprite.body.velocity.x = GLOBAL_MOVEMENT_SPEED;
                        sprite.body.facingX = Phaser.RIGHT;
                    }
                    else {
                        this.rightDownAccum += this.game.time.elapsed;
                    }
                }

                if (kc.isUp(Phaser.Keyboard.LEFT)) {
                    this.leftDownAccum = 0;
                }
                if (kc.isUp(Phaser.Keyboard.RIGHT)) {
                    this.rightDownAccum = 0;
                }
            }
            
            
        }
    };

// Link
// ----
chongdashu.MovementSystem = chongdashu.Utils.promote(MovementSystem, "System");

}());


