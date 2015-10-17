/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * JumpingSystem
 * @class JumpingSystem
 * @constructor
 **/
var JumpingSystem = function(state) {
    this.init(state);
};
var p = chongdashu.Utils.extend(JumpingSystem, chongdashu.System);

    p.keyStates = {};

    p.keyboard = null;
    p.group = null;

    p.doJump = false;

    p.init = function(state)
    {
        console.log("[JumpingSystem], init()");
        this.System_init(state);

        this.addComponent(chongdashu.KeyboardComponent.TYPE);
    };

    p.update = function(entity) {
        if (this.System_update(entity)) {
            var self = this;
            var sprite = entity;
            var kc = sprite.komponents[chongdashu.KeyboardComponent.TYPE];
            
            if (kc.isDown(Phaser.Keyboard.Z) && !kc.isJustDown(Phaser.Keyboard.Z)) {
                
                if (self.doJump) {
                    var squashTween = this.game.add.tween(sprite.scale).to({
                        x: 1.25,
                        y: 0.75
                    }, 125, Phaser.Easing.Exponential.Out, true);

                    squashTween.onComplete.add(function() {
                        sprite.isJumping = true;
                        sprite.body.allowGravity = true;
                        sprite.anchor.set(0.5, 0.5);
                        sprite.position.y -= 32;
                        sprite.body.velocity.y = -GLOBAL_JUMP_SPEED;
                        var squeezeTween = self.game.add.tween(sprite.scale).to({
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

            if (kc.isJustDown(Phaser.Keyboard.Z)) {

                if (sprite.isJumping && sprite.groundTween) {

                    sprite.groundTween.stop(false);
                    sprite.anchor.set(0.5);
                    // sprite.scale.set(1.0);
                    sprite.position.y -= 32;
                    sprite.groundTween = null;
                    sprite.isJumping = false;
                }

                if (!sprite.isJumping) {
                    if (!self.doJump) {
                        sprite.anchor.set(0.5, 1);
                        sprite.position.y += 32;
                        sprite.update();
                        sprite.body.allowGravity = false;
                        self.doJump = true;
                    }
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

    p.render = function() {
        // console.log("[JumpingSystem], render()");
        this.System_render();
        // p.game.debug.spriteInfo(this.state.player, 16, 16);
        // p.game.debug.body(this.state.player);
        // p.game.debug.bodyInfo(this.state.player, 16, 16);
    };
    

// Link
// ----
chongdashu.JumpingSystem = chongdashu.Utils.promote(JumpingSystem, "System");

}());


