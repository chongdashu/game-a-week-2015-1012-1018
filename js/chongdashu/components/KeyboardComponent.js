/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * KeyboardComponent
 * @class KeyboardComponent
 * @constructor
 **/
var KeyboardComponent = function(entity) {
    this.init(entity);
};
var p = chongdashu.Utils.extend(KeyboardComponent, chongdashu.Component);
    
    KeyboardComponent.TYPE = "component:KeyboardComponent";

    p.init = function(entity)
    {
        console.log("[KeyboardComponent], init()");
        this.Component_init(entity, KeyboardComponent.TYPE);
    };

    p.getType = function() {
        console.log("[KeyboardComponent], getType()");
        return this.Component_getType();
    };
    

// Link
// ----
chongdashu.KeyboardComponent = chongdashu.Utils.promote(KeyboardComponent, "Component");

}());


