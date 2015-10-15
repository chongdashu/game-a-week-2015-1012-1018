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
var SpriteMovementSystem = function(state) {
    this.init(state);
};
var p = chongdashu.Utils.extend(SpriteMovementSystem, chongdashu.System);

    p.keyStates = {};

    p.keyboard = null;
    p.group = null;

    SpriteMovementSystem.UP = "up";
    SpriteMovementSystem.JUST_UP = "just_up";
    SpriteMovementSystem.DOWN = "down";
    SpriteMovementSystem.JUST_DOWN = "just_down";

    p.doJump = false;

    p.init = function(state)
    {
        console.log("[SpriteMovementSystem], init()");
        this.System_init(state);

        this.keyboard = this.state.game.input.keyboard;
        this.group = this.state.agentGroup;

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
        console.log("[SpriteMovementSystem], update()");
        this.System_update();

        this.updateKeyStates();
        this.updateGroup();
    };

    p.updateGroup = function() {
        var self = this;
        if (this.group) {
            this.group.forEach(function(sprite) {
                
                if (self.isDown(Phaser.Keyboard.W) && !self.isJustDown(Phaser.Keyboard.W)) {
                    
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

                if (self.isJustDown(Phaser.Keyboard.W)) {

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
        // console.log("[SpriteMovementSystem], render()");
        this.System_render();
        // p.game.debug.spriteInfo(this.state.player, 16, 16);
        // p.game.debug.body(this.state.player);
        // p.game.debug.bodyInfo(this.state.player, 16, 16);
    };
    

// Link
// ----
chongdashu.SpriteMovementSystem = chongdashu.Utils.promote(SpriteMovementSystem, "System");

}());


