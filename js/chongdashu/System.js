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
var System = function(game) {
    this.init(game);
};
var p = System.prototype;
System.prototype.constructor = System;
    
    p.components = [];

    p.init = function(game)
    {
        console.log("[System], init()");
        this.game = game;
    };

    p.update = function() {
        // console.log("[System], update()");
    };

    p.render = function() {

    };
    

// Link
// ----
chongdashu.System = System;

}());


