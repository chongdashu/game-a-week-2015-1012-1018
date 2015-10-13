/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Component
 * @class Component
 * @constructor
 **/
var Component = function(entity) {
    this.init(entity);
};
var p = Component.prototype;
Component.prototype.constructor = Component;
    
    p.componentType = null;
    p.entity = null;

    p.init = function(entity, componentType)
    {
        console.log("[Component], init()");
        this.entity = entity;
        this.componentType = componentType;
    };

    p.getType = function() {
        console.log("[Component], getType()");
        return this.componentType;
    };

    p.getEntity = function() {
        return this.entity;
    };
    

// Link
// ----
chongdashu.Component = Component;

}());


