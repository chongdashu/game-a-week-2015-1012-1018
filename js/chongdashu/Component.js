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

    Component.add = function (entity, componentType)  {

    };

    p.init = function(entity, componentType)
    {
        console.log("[Component], init()");
        this.entity = entity;
        this.componentType = componentType;
    };

    p.addTo = function(entity) {
        console.log(entity.komponents);
        if (!entity.komponents) {
            entity.komponents = {};
        }
        entity.komponents[this.getType()] = this;
    };

    p.getType = function() {
        console.log("[Component], getType()");
        return this.componentType;
    };

    p.getEntity = function() {
        return this.entity;
    };

    p.update = function() {
        // console.log("[Component], update()");
    };
    

// Link
// ----
chongdashu.Component = Component;

}());


