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

        this.addComponent(this.kc = new chongdashu.KeyboardComponent(this.game.input.keyboard));
        this.kc.keyStates[Phaser.Keyboard.SPACEBAR] = chongdashu.KeyboardComponent.UP;

        this.arrowGroup = this.game.add.group();
    };

    p.update = function() {
        this.System_update();

        var self = this;

        this.game.physics.arcade.collide(this.arrowGroup, this.state.groundGroup);

        if (this.kc) {
            if (this.kc.isJustDown(Phaser.Keyboard.SPACEBAR)) {
                var offsetX = this.state.player.body.facingX == Phaser.RIGHT ? 32 : -32;
                var arrow = this.arrowGroup.create(this.state.player.x+offsetX, this.state.player.y-8, "arrow");
                arrow.anchor.set(0.5, 0.5);
                this.game.physics.arcade.enable(arrow);

                arrow.animations.add("default", [0,1], 60);
                arrow.animations.play("default");
                arrow.body.setSize(32, 16);

                arrow.body.velocity.x = (this.state.player.body.facingX === Phaser.RIGHT ? 1000 : -1000);
                // arrow.body.gravity.set(0,10);
                // arrow.body.collideWorldBounds = true;
                arrow.angle = 0;
                arrow.body.bounce.set(this.game.rnd.between(0, 1), this.game.rnd.between(0.3,0.4));
                arrow.body.drag.set(100);
                arrow.body.friction.set(1000);
                arrow.scale.set(this.state.player.body.facingX == Phaser.RIGHT ? 1 : -1, 1);

                console.log(this.state.player.body.facingX);

                this.state.player.body.velocity.x -= (this.state.player.body.facingX === Phaser.RIGHT ? 100 : -100);

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

    p.render = function() {
        this.System_render();

        var self = this;

        // this.arrowGroup.forEach(function(arrow) {
            // self.game.debug.body(arrow);
        // });

    };

// Link
// ----
chongdashu.ArrowShootingSystem = chongdashu.Utils.promote(ArrowShootingSystem, "System");

}());


