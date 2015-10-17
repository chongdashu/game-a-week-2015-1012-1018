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

    p.init = function(state)
    {
        console.log("[EnemySystem], init()");
        this.System_init(state);

        // Add components to check for
        // ---------------------------

        this.addComponent(chongdashu.EnemyComponent.TYPE);
        this.addComponent(chongdashu.HealthComponent.TYPE);
    };

    p.update = function(entity) {
        if (this.System_update(entity)) {
            
            // Begin update
            // ------------
            var ec = entity.komponents[chongdashu.EnemyComponent.TYPE];
        }
    };

    p.onArrowEnemyCollide = function(arrow, enemy) {

        // juice: sleep
        if (enemy.animations.currentAnim.name !== "kill") {
            var timer = this.game.time.create(true);
            // enemy.body.allowGravity = true;
            enemy.body.immovable = true;
            enemy.body.velocity.set(0,0);
            this.game.physics.arcade.isPaused = true;
            timer.add(this.game.rnd.between(50,55), function() {
                // animation
                enemy.animations.play("kill", null, null, true);
                self.game.physics.arcade.isPaused = false;

                console.log(enemy);

                var auc = enemy.komponents[chongdashu.AudioComponent.TYPE];
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


