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
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = chongdashu.Utils.extend(KeyboardComponent, chongdashu.Component);
    
    KeyboardComponent.TYPE = "component:KeyboardComponent";

    KeyboardComponent.UP = "up";
    KeyboardComponent.JUST_UP = "just_up";
    KeyboardComponent.DOWN = "down";
    KeyboardComponent.JUST_DOWN = "just_down";

    p.keyStates = null;

    p.init = function(entity)
    {
        console.log("[KeyboardComponent], init()");
        this.Component_init(entity, KeyboardComponent.TYPE);
        this.keyStates = {};
    };

    p.getType = function() {
        console.log("[KeyboardComponent], getType()");
        return this.Component_getType();
    };

    p.isJustDown = function(keycode) {
        return this.keyStates[keycode] && (this.keyStates[keycode] === KeyboardComponent.JUST_DOWN);
    };

    p.isDown = function(keycode) {
        return this.keyStates[keycode] && (this.isJustDown(keycode) || (this.keyStates[keycode] === KeyboardComponent.DOWN));
    };

    p.isJustUp = function(keycode) {
        return this.keyStates[keycode] && (this.keyStates[keycode] === KeyboardComponent.JUST_UP);
    };

    p.isUp = function(keycode) {
        return this.keyStates[keycode] && (this.isJustUp(keycode) || (this.keyStates[keycode] === KeyboardComponent.UP));
    };

    p.update = function() {
        this.Component_update();

        var self = this;

        $.each(this.keyStates, function(key, state) {
            if (self.entity.isDown(key)) {
                if (state == KeyboardComponent.JUST_UP || state == KeyboardComponent.UP) {
                    self.keyStates[key] = KeyboardComponent.JUST_DOWN;
                }
                else {
                    self.keyStates[key] = KeyboardComponent.DOWN;
                }
            }
            else if (!self.entity.isDown(key)) {
                if (state == KeyboardComponent.JUST_DOWN || state == KeyboardComponent.DOWN) {
                    self.keyStates[key] = KeyboardComponent.JUST_UP;
                }
                else {
                    self.keyStates[key] = KeyboardComponent.UP;
                }
            }
        });
    };
    

// Link
// ----
chongdashu.KeyboardComponent = chongdashu.Utils.promote(KeyboardComponent, "Component");

}());


