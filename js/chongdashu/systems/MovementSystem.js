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

            if (!ac.arrow) {
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

    p.onAgentGroundCollide = function(agent, ground) {
        if (agent.body.touching.down && !agent.groundTween && agent.isJumping) {
            agent.anchor.set(0.5,1.0);
            agent.y += 32;
            var squashTween = this.game.add.tween(agent.scale).to({
                x: 1.25,
                y: 0.75
            }, 125, Phaser.Easing.Exponential.Out, true);
            agent.groundTween = squashTween;

            squashTween.onComplete.add(function() {
                agent.anchor.set(0.5);
                agent.position.y -= 32;
                agent.groundTween = null;
                agent.isJumping = false;
            });

            squashTween.yoyo(true);
        }
    };

// Link
// ----
chongdashu.MovementSystem = chongdashu.Utils.promote(MovementSystem, "System");

}());


