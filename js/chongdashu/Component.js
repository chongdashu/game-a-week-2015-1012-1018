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
var Component = function(game) {
    this.init(game);
};
var p = Component.prototype;
Component.prototype.constructor = Component;
    
    p.components = [];

    p.init = function(game)
    {
        console.log("[Component], init()");
        this.game = game;
    };
    

// Link
// ----
chongdashu.Component = Component;

}());


