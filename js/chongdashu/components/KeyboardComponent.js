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
var KeyboardComponent = function(game) {
    this.init(game);
};
var p = KeyboardComponent.prototype;
KeyboardComponent.prototype.constructor = KeyboardComponent;
    
    p.components = [];

    p.init = function(game)
    {
        console.log("[KeyboardComponent], init()");
        this.game = game;
    };
    

// Link
// ----
chongdashu.KeyboardComponent = KeyboardComponent;

}());


