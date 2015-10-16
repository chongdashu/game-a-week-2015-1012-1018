/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * MouseComponent
 * @class MouseComponent
 * @constructor
 **/
var MouseComponent = function(entity) {
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = chongdashu.Utils.extend(MouseComponent, chongdashu.Component);
    
    MouseComponent.TYPE = "component:MouseComponent";

    p.mouse = null;

    p.init = function(entity)
    {
        console.log("[MouseComponent], init()");
        this.Component_init(entity, MouseComponent.TYPE);
    };

    p.update = function() {
        this.Component_update();
    };
    

// Link
// ----
chongdashu.MouseComponent = chongdashu.Utils.promote(MouseComponent, "Component");

}());


