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
        this.arrowGroup = this.game.add.group();
    };

    p.createArrow = function(entity) {
     

        var arrow = this.arrowGroup.create(entity.x, entity.y, "arrow");
        arrow.anchor.set(0.5, 0.5);
        this.game.physics.arcade.enable(arrow);

        arrow.animations.add("aim", [1], 60);
        arrow.animations.add("shoot", [0,1], 60);
        arrow.animations.stop("aim", true);

        arrow.body.allowGravity = false;
        arrow.body.bounce.set(this.game.rnd.between(0, 1), this.game.rnd.between(0.3,0.4));
        arrow.body.drag.set(100);
        arrow.body.friction.set(1000);
        

        return arrow;
    };

    p.update = function(entity) {
        if (this.System_update(entity)) {
            var self = this;

            this.game.physics.arcade.collide(this.arrowGroup, this.state.groundGroup);

            var kc = entity.komponents[chongdashu.KeyboardComponent.TYPE];
            var ac = entity.komponents[chongdashu.AimingComponent.TYPE];

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


