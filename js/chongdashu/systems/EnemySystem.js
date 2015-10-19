/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * EnemySystem
 * @class EnemySystem
 * @constructor
 **/
var EnemySystem = function(state) {
    this.init(state);
};
var p = chongdashu.Utils.extend(EnemySystem, chongdashu.System);
    
    p.enemiesKilled = null;

    p.init = function(state)
    {
        console.log("[EnemySystem], init()");
        this.System_init(state);

        // Add components to check for
        // ---------------------------

        this.addComponent(chongdashu.EnemyComponent.TYPE);
        this.addComponent(chongdashu.HealthComponent.TYPE);

        this.enemiesKilled = 0;
    };

    p.update = function(entity) {
        if (this.System_update(entity)) {
            
            // Begin update
            // ------------
            var ec = entity.komponents[chongdashu.EnemyComponent.TYPE];
        }
    };

    p.onArrowEnemyCollide = function(arrow, enemy) {

        // handle enemy
        // ------------

        if (enemy.animations.currentAnim.name !== "kill") {
            var timer = this.game.time.create(true);
            // enemy.body.allowGravity = true;
            enemy.body.immovable = true;
            enemy.body.velocity.set(0,0);
            this.game.physics.arcade.isPaused = true;

            if (!arrow.kills) {
                arrow.kills = 0;
            }

            this.enemiesKilled++;

            arrow.kills++;

            var auc = enemy.komponents[chongdashu.AudioComponent.TYPE];
            if (auc) {
                auc.play("enemy-hurt");
            }
            if (this.state.juicy && (arrow.kills > 1 || this.enemiesKilled % 5 === 0 || this.game.rnd.frac() > 0.8)) {
                var flash = this.state.juicy.createScreenFlash("");
                this.game.add.existing(flash);
                flash.anchor.set(0.5);
                flash.flash();
            }
            
            if (this.state.screenShake) {
                this.state.screenShake.shake(this.game.rnd.integerInRange(10,15));
            }

            var self = this;

            timer.add(this.game.rnd.between(50,55), function() {
                // animation
                enemy.animations.play("kill", null, null, true);
                self.game.physics.arcade.isPaused = false;

                if (self.state.enemyEmitter) {
                    self.state.enemyEmitter.x = enemy.x;
                    self.state.enemyEmitter.y = enemy.y;
                    self.state.enemyEmitter.start(true, 5000, null, self.game.rnd.integerInRange(10,15));
                }

                if (auc) {
                    auc.play("enemy-kill");
                }
            });
            timer.start();
        }
       
        
    };

// Link
// ----
chongdashu.EnemySystem = chongdashu.Utils.promote(EnemySystem, "System");

}());


