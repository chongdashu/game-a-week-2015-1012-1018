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
    
    p.components = [];

    p.init = function(state)
    {
        console.log("[System], init()");
        this.state = state;
        this.game = state.game;
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


