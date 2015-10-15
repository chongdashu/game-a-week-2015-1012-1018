/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * ArrowShootingSystem
 * @class ArrowShootingSystem
 * @constructor
 **/
var ArrowShootingSystem = function(state) {
    this.init(state);
};
var p = chongdashu.Utils.extend(ArrowShootingSystem, chongdashu.System);

    p.keyStates = {};

    p.keyboard = null;
    p.group = null;

    ArrowShootingSystem.UP = "up";
    ArrowShootingSystem.JUST_UP = "just_up";
    ArrowShootingSystem.DOWN = "down";
    ArrowShootingSystem.JUST_DOWN = "just_down";

    p.doJump = false;

    p.init = function(state)
    {
        
    };

// Link
// ----
chongdashu.ArrowShootingSystem = chongdashu.Utils.promote(ArrowShootingSystem, "System");

}());


