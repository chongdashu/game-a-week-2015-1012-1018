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

    p.update = function(entity) {
        if (this.System_update(entity)) {
            var self = this;

            this.game.physics.arcade.collide(this.arrowGroup, this.state.groundGroup);

            var kc = entity.komponents[chongdashu.KeyboardComponent.TYPE];
            var ac = entity.komponents[chongdashu.AimingComponent.TYPE];

            kc.initKey(Phaser.Keyboard.SPACEBAR);

            if (kc.isJustDown(Phaser.Keyboard.SPACEBAR)) {
                var offsetX = entity.body.facingX == Phaser.RIGHT ? 32 : -32;
                var offsetY = -8 + (entity.anchor.y == 1 ? -32 : 0 );
                var arrow = this.arrowGroup.create(entity.x+offsetX, entity.y+offsetY, "arrow");
                arrow.anchor.set(0.5, 0.5);
                this.game.physics.arcade.enable(arrow);

                arrow.animations.add("default", [0,1], 60);
                arrow.animations.play("default");
                arrow.body.setSize(32, 16);

                arrow.body.velocity.x = (entity.body.facingX === Phaser.RIGHT ? 1000 : -1000);
                // arrow.body.gravity.set(0,10);
                // arrow.body.collideWorldBounds = true;
                arrow.angle = 0;
                arrow.body.bounce.set(this.game.rnd.between(0, 1), this.game.rnd.between(0.3,0.4));
                arrow.body.drag.set(100);
                arrow.body.friction.set(1000);
                arrow.scale.set(entity.body.facingX == Phaser.RIGHT ? 1 : -1, 1);

                console.log(entity.body.facingX);

                entity.body.velocity.x -= (entity.body.facingX === Phaser.RIGHT ? 100 : -100);

                var timer = this.game.time.create(true);
                this.game.physics.arcade.isPaused = true;
                timer.add(this.game.rnd.between(50,80), function() {
                    console.log("AHA");
                    self.game.physics.arcade.isPaused = false;
                });
                timer.start();
                

            }
        }

        
    };

// Link
// ----
chongdashu.ArrowShootingSystem = chongdashu.Utils.promote(ArrowShootingSystem, "System");

}());


