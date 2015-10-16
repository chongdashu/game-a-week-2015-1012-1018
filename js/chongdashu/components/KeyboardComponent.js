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
    p.keyboard = null;
    p.lastUpdateId = null;

    p.init = function(entity)
    {
        console.log("[KeyboardComponent], init()");
        this.Component_init(entity, KeyboardComponent.TYPE);
        this.keyStates = {};
        this.keyboard = entity;
        this.lastUpdateId = -1;

        this.initKey(Phaser.Keyboard.W);
        this.initKey(Phaser.Keyboard.A);
        this.initKey(Phaser.Keyboard.S);
        this.initKey(Phaser.Keyboard.D);
        this.initKey(Phaser.Keyboard.SPACEBAR);
    };

    p.initKey = function(keycode) {
        if (!(keycode in this.keyStates)) {
            this.keyStates[keycode] = KeyboardComponent.UP;
        }
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
            if (self.keyboard.isDown(key)) {
                if (state == KeyboardComponent.JUST_UP || state == KeyboardComponent.UP) {
                    self.keyStates[key] = KeyboardComponent.JUST_DOWN;
                }
                else {
                    self.keyStates[key] = KeyboardComponent.DOWN;
                }
            }
            else if (!self.keyboard.isDown(key)) {
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


