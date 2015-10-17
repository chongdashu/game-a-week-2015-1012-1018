/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * AudioComponent
 * @class AudioComponent
 * @constructor
 **/
var AudioComponent = function(entity) {
    // @param {Phaser.Keyboard} entity
    this.init(entity);
};
var p = chongdashu.Utils.extend(AudioComponent, chongdashu.Component);
    
    AudioComponent.TYPE = "component:AudioComponent";

    p.audioCache = {};

    p.init = function(entity)
    {
        console.log("[AudioComponent], init()");
        this.Component_init(entity, AudioComponent.TYPE);

        this.audioCache = {};
    };

    p.play = function(audioName) {
        if (!(audioName in this.audioCache)) {
            this.audioCache[audioName] = this.entity.add.audio(audioName);
        }
        this.audioCache[audioName].play();
    };

    p.update = function() {
        this.Component_update();
    };
    

// Link
// ----
chongdashu.AudioComponent = chongdashu.Utils.promote(AudioComponent, "Component");

}());