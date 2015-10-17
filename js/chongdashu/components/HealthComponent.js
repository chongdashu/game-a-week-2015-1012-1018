/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * HealthComponent
 * @class HealthComponent
 * @constructor
 **/
var HealthComponent = function(entity) {
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = chongdashu.Utils.extend(HealthComponent, chongdashu.Component);
    
    HealthComponent.TYPE = "component:HealthComponent";

    p.health = 1;

    p.init = function(entity)
    {
        console.log("[HealthComponent], init()");
        this.Component_init(entity, HealthComponent.TYPE);
    };

    p.update = function() {
        this.Component_update();
    };
    

// Link
// ----
chongdashu.HealthComponent = chongdashu.Utils.promote(HealthComponent, "Component");

}());


