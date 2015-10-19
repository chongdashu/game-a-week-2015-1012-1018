/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * System
 * @class System
 * @constructor
 **/
var System = function(state) {
    this.init(state);
};
var p = System.prototype;
System.prototype.constructor = System;
    
    p.components = {};
    p.enabled = false;

    p.init = function(state)
    {
        console.log("[System], init()");
        this.state = state;
        this.game = state.game;
        this.components = {};
        this.enabled = true;
    };

    p.update = function(entity) {

        var containsAllComponents = this.containsKeys(entity, this.components);
        // if (containsAllComponents) {
        //     $.each(entity.komponents, function(key, value) {
        //         console.log(key, value);
        //         value.update();
        //     });
        // }
        return this.enabled && containsAllComponents;
    };

    // Credit: http://stackoverflow.com/posts/14368628/revisions
    p.compareKeys = function(a, b) {
        var aKeys = Object.keys(a).sort();
        var bKeys = Object.keys(b).sort();

        return JSON.stringify(aKeys) === JSON.stringify(bKeys);
    };

    p.containsKeys = function(entity, components) {

        var containsKeys = true;

        $.each(components, function(key, value) {

            if (!(key  in entity.komponents)) {
                containsKeys = false;
                return false;
            }
        });
        return containsKeys;
    };

    p.render = function() {

    };

    p.addComponent = function(component) {
        this.components[component] = true;
    };
    

// Link
// ----
chongdashu.System = System;

}());


