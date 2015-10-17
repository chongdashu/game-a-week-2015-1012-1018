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

            if (!ac.arrow && this.game.time.time - ac.arrowReleaseTime > 350) {
                if (kc.isDown(Phaser.Keyboard.LEFT)) {
                    sprite.body.velocity.x = -GLOBAL_MOVEMENT_SPEED;
                    sprite.body.facingX = Phaser.LEFT;
                }
                if (kc.isDown(Phaser.Keyboard.RIGHT)) {
                    sprite.body.velocity.x = GLOBAL_MOVEMENT_SPEED;
                    sprite.body.facingX = Phaser.RIGHT;
                }
            }
            
            
        }
    };

// Link
// ----
chongdashu.MovementSystem = chongdashu.Utils.promote(MovementSystem, "System");

}());


