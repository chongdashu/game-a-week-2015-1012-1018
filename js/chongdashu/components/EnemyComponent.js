/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * EnemyComponent
 * @class EnemyComponent
 * @constructor
 **/
var EnemyComponent = function(entity) {
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = chongdashu.Utils.extend(EnemyComponent, chongdashu.Component);
    
    // Type
    // ----
    EnemyComponent.TYPE = "component:EnemyComponent";

    EnemyComponent.ENEMY_FLYING = "EnemyComponent:flying";
    EnemyComponent.ENEMY_GROUND = "EnemyComponent:ground";

    p.enemyType = null;

    p.init = function(entity)
    {
        console.log("[EnemyComponent], init()");
        this.Component_init(entity, EnemyComponent.TYPE);

        // Init goes here
        // --------------
        this.enemyType = EnemyComponent.ENEMY_FLYING;
    };

    p.update = function() {
        this.Component_update();

        // Update goes here
        // ----------------
    };

    p.getEnemy = function() {
        return this.enemyGroup.length;
    };
    

// Link
// ----
chongdashu.EnemyComponent = chongdashu.Utils.promote(EnemyComponent, "Component");

}());


