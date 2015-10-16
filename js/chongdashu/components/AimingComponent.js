/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * AimingComponent
 * @class AimingComponent
 * @constructor
 **/
var AimingComponent = function(entity) {
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = chongdashu.Utils.extend(AimingComponent, chongdashu.Component);
    
    AimingComponent.TYPE = "component:AimingComponent";

    p.angle = 0;

    p.init = function(entity)
    {
        console.log("[AimingComponent], init()");
        this.Component_init(entity, AimingComponent.TYPE);
        this.angle = 0;
    };

    p.update = function() {
        this.Component_update();
    };
    

// Link
// ----
chongdashu.AimingComponent = chongdashu.Utils.promote(AimingComponent, "Component");

}());


