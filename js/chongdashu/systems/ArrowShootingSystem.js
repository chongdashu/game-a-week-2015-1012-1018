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

        this.game.physics.arcade.collide(this.arrowGroup, this.state.groundGroup);

        if (this.kc) {
            if (this.kc.isJustDown(Phaser.Keyboard.SPACEBAR)) {
                var arrow = this.arrowGroup.create(this.state.player.x+32, this.state.player.y, "arrow");
                arrow.anchor.set(0.5, 0.5);
                this.game.physics.arcade.enable(arrow);

                arrow.animations.add("default", [0,1], 60);
                arrow.animations.play("default");
                arrow.body.setSize(32, 16);

                arrow.body.velocity.x = this.state.player.x + (this.state.player.body.facingX === Phaser.RIGHT ? 500 : -500);
                arrow.body.collideWorldBounds = true;
                arrow.angle = 0;
                arrow.body.bounce.set(0.1, 0.1);
                arrow.body.drag.set(100);
                arrow.body.friction.set(100000);

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


