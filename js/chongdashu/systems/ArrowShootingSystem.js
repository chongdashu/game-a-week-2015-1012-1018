/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * ArrowShootingSystem
 * @class ArrowShootingSystem
 * @constructor
 **/
var ArrowShootingSystem = function(state) {
    this.init(state);
};
var p = chongdashu.Utils.extend(ArrowShootingSystem, chongdashu.System);
    
    /**
     * KeyboardComponent
     */
    p.kc = null;
    p.arrowGroup = null;

    p.init = function(state)
    {
        console.log("[ArrowShootingSystem], init()");
        this.System_init(state);

        this.addComponent(chongdashu.KeyboardComponent.TYPE);
        this.addComponent(chongdashu.AimingComponent.TYPE);
        this.arrowGroup = state.arrowGroup;
    };

    p.createArrow = function(entity) {
     

        var arrow = this.arrowGroup.create(entity.x, entity.y, "arrow");
        arrow.anchor.set(0.5, 0.5);
        this.game.physics.arcade.enable(arrow);

        new chongdashu.AudioComponent(this.game).addTo(arrow);

        arrow.events.onKilled.addOnce(function(arrow) {
            this.arrowGroup.remove(arrow);
        }, this);

        arrow.outOfBoundsKill = true;
        arrow.checkWorldBounds = true;

        arrow.animations.add("aim", [1], 60);
        arrow.animations.add("shoot", [0,1], 60);
        arrow.animations.stop("aim", true);

        arrow.body.allowGravity = false;
        arrow.body.bounce.set(this.game.rnd.between(0, 1), this.game.rnd.between(0.3,0.4));
        arrow.body.drag.set(100);
        arrow.body.friction.set(1000);
        

        return arrow;
    };

    p.onArrowEnemyCollide = function(arrow, enemy) {
        if (arrow.checkWorldBounds && arrow.outOfBoundsKill) {
            arrow.checkWorldBounds = false;
            arrow.outOfBoundsKill = false;

            arrow.body.velocity.set(0,0);
            arrow.body.bounce.set(0,0.2);
            arrow.body.angularVelocity = 720;
        }
    };

    p.onArrowGroundCollide = function( arrow, ground) {

        if (arrow.body.angularVelocity !== 0) {

            arrow.body.angularVelocity = 0;
            arrow.scale.set(1,1);
            arrow.rotation = Math.PI/2;

            var auc = arrow.komponents[chongdashu.AudioComponent.TYPE];
            console.log(arrow.komponents);
            console.log(auc);
            if (auc) {
                console.log("ASDASS");
                auc.play("arrow-ground-hit");
                
            }
            arrow.enable = false;

            if (this.state.groundEmitter) {
                // particles
                this.state.groundEmitter.position.set(arrow.x, ground.y-16);
                this.state.groundEmitter.start(true, 500 , null, 10);
            }

            // tween
            // -----
            var squashTween = this.game.add.tween(arrow.scale).to({
                x: 1.25,
                y: 0.75
            }, 80, Phaser.Easing.Exponential.Out);

            var squeezeTween  = this.game.add.tween(arrow.scale).to({
                x: 1,
                y: 1
            }, 80, Phaser.Easing.Exponential.InOut);

            var fadeTween =this.game.add.tween(arrow).to({
                alpha: 0
            }, 2000);

            squashTween.onComplete.add(function() {
                arrow.rotation = Math.PI/2;
            });

            fadeTween.onComplete.add(function() {
                this.arrowGroup.remove(arrow);
            }, this);

            squashTween.chain(squeezeTween, fadeTween).chain();
            squashTween.start();

           
        }
    };

    p.update = function(entity) {
        if (this.System_update(entity)) {
            var self = this;

            this.game.physics.arcade.collide(this.arrowGroup, this.state.groundGroup);

            var kc = entity.komponents[chongdashu.KeyboardComponent.TYPE];
            var ac = entity.komponents[chongdashu.AimingComponent.TYPE];
            var auc = entity.komponents[chongdashu.AudioComponent.TYPE];

            kc.initKey(Phaser.Keyboard.X);

            var arrow = null;

            if (kc.isDown(Phaser.Keyboard.X)) {
                if (kc.isJustDown(Phaser.Keyboard.X)) {
                    // Handle arrow creation
                    // ---------------------
                    if (ac.arrow === null) {
                        ac.arrow = this.createArrow(entity);
                    }
                }
                else {
                    // Handle arrow rotation
                    // ---------------------
                    if (ac.arrow !== null) {
                        arrow = ac.arrow;

                        var offsetX = entity.body.facingX == Phaser.RIGHT ? 32 : -32;
                        var offsetY = -8 + (entity.anchor.y == 1 ? -32 : 0 );

                        // arrow.x = entity.x + offsetX;
                        // arrow.y = entity.y + offsetY;

                        if (entity.body.facingX == Phaser.RIGHT) {
                            if (kc.isJustDown(Phaser.Keyboard.LEFT)) {
                                entity.body.facingX = Phaser.LEFT;
                            }
                            else if (kc.isDown(Phaser.Keyboard.RIGHT) && kc.isDown(Phaser.Keyboard.UP)) {
                                arrow.angle = -45;
                            }
                            else if (kc.isDown(Phaser.Keyboard.RIGHT) && kc.isUp(Phaser.Keyboard.UP)) {
                                arrow.angle = 0;
                            }
                            else if (kc.isUp(Phaser.Keyboard.RIGHT) && kc.isDown(Phaser.Keyboard.UP)) {
                                arrow.angle = -90;
                            }
                        }
                        else if (entity.body.facingX == Phaser.LEFT) {
                            if (kc.isJustDown(Phaser.Keyboard.RIGHT)) {
                                entity.body.facingX = Phaser.RIGHT;
                            }
                            else if (kc.isDown(Phaser.Keyboard.LEFT) && kc.isDown(Phaser.Keyboard.UP)) {
                                arrow.angle = 45;
                            }
                            else if (kc.isDown(Phaser.Keyboard.LEFT) && kc.isUp(Phaser.Keyboard.UP)) {
                                arrow.angle = 0;
                            }
                            else if (kc.isUp(Phaser.Keyboard.LEFT) && kc.isDown(Phaser.Keyboard.UP)) {
                                arrow.angle = 90;
                            }
                        }

                        if (entity.body.facingX == Phaser.RIGHT) {
                            arrow.scale.set(1, 1);
                        }
                        else if (entity.body.facingX == Phaser.LEFT) {
                            arrow.scale.set(-1, 1);
                        }
                    }
                }
            }

            if (ac.arrow && kc.isDown(Phaser.Keyboard.X)) {
                // position the arrow appropriately according to the entity position
                ac.arrow.position.x = entity.position.x;
                ac.arrow.position.y = entity.position.y;

                if (entity.body && entity.anchor.y == 1) {
                    ac.arrow.position.y -= 32;
                }
            }

            if (kc.isJustUp(Phaser.Keyboard.X)) {

                // Handle shooting
                // ---------------
                arrow = ac.arrow;

                if (arrow) {
                    
                    // allow gravity
                    arrow.body.allowGravity = true;

                    var rotation = arrow.rotation;
                    if (entity.body.facingX == Phaser.LEFT) {
                        rotation = Phaser.Math.reverseAngle(rotation);
                    }

                    arrow.body.velocity.x = ac.speed * Math.cos(rotation);
                    arrow.body.velocity.y = ac.speed * Math.sin(rotation);

                    console.log("arrow.angle=%s", arrow.angle);
                    console.log("ac.arrowSpeed=%s", ac.arrowSpeed);
                    console.log("arrowbody.velocity.x=%s", arrow.body.velocity.x);
                    console.log("arrowbody.velocity.y=%s", arrow.body.velocity.y);

                    // set velocity
                    // arrow.body.velocity.x = (entity.body.facingX === Phaser.RIGHT ? 1000 : -1000);

                    // kickback
                    entity.body.velocity.x -= (entity.body.facingX === Phaser.RIGHT ? 100 : -100);

                    // juice: sleep
                    var timer = this.game.time.create(true);
                    this.game.physics.arcade.isPaused = true;
                    timer.add(this.game.rnd.between(50,75), function() {
                        // animation
                        arrow.animations.play("shoot");
                        self.game.physics.arcade.isPaused = false;

                        // audio
                        // -----
                        if (auc) {
                            var shootNumber = self.game.rnd.integerInRange(1,1);
                            auc.play("shoot-" + shootNumber.toString());
                        }
                    });
                    timer.start();

                    // remove arrow from component
                    ac.arrow = null;
                    ac.arrowReleaseTime = this.game.time.time;
                }
            }
        }
    };

// Link
// ----
chongdashu.ArrowShootingSystem = chongdashu.Utils.promote(ArrowShootingSystem, "System");

}());


