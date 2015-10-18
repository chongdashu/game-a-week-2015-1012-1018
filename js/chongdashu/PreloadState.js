/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * PreloadState
 * @class PreloadState
 * @constructor
 **/
var PreloadState = function(game) {
};
var p = PreloadState.prototype;
    
    p.logo = null;
    p.loadingFrame = null;
    p.loadingBar = null;
    p.loadingText = null;

    // @phaser
    p.preload = function() {
        console.log("[PreloadState], preload()");

        // Preloader specific stuff.
        // -------------------------
        this.game.world.setBounds(
            -GLOBAL_GAME_WIDTH/2,
            -GLOBAL_GAME_HEIGHT/2,
            GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT);

        // this.game.camera.bounds.setTo(-GLOBAL_GAME_WIDTH/2, -GLOBAL_GAME_HEIGHT/2, GLOBAL_GAME_WIDTH*2, GLOBAL_GAME_HEIGHT*2);

        this.loadingFrame = this.game.add.sprite(0,0, "preloader-frame");
        this.loadingBar = this.game.add.sprite(0,0, "preloader-bar");
        this.loadingText = this.game.add.text(0,0, "Loading: 0%", { font: "16pt Garamond", align: "center", fill : "#FFFFFF", stroke : "black", strokeThickness: 1});

        this.loadingFrame.anchor.set(0.5);
        this.loadingBar.anchor.set(0.5);
        this.loadingText.anchor.set(0.5);

        this.load.setPreloadSprite(this.loadingBar);

        // Loading begins here.
        // --------------------
        this.game.load.image("background", "res/background.png");
        this.game.load.image("tile-brown", "res/tile-brown.png");
        this.game.load.image("player", "res/player.png");
        this.game.load.spritesheet("arrow", "res/arrow.png", 32, 32);
        this.game.load.spritesheet("enemy", "res/enemy.png", 32, 32);
        this.game.load.audio("jump", "res/jump.wav");
        this.game.load.audio("shoot-1", "res/shoot-1.wav");
        this.game.load.audio("shoot-2", "res/shoot-2.wav");
        this.game.load.audio("shoot-3", "res/shoot-3.wav");
        this.game.load.audio("shoot-4", "res/shoot-4.wav");
        this.game.load.audio("enemy-kill", "res/enemy-kill.wav");
        this.game.load.audio("enemy-hurt", "res/enemy-hurt.wav");
        this.game.load.audio("arrow-ground-hit", "res/arrow-ground-hit.wav");
        this.game.load.audio("enemy-appear-1", "res/enemy-appear-1.wav");
        this.game.load.audio("enemy-appear-2", "res/enemy-appear-2.wav");
        this.game.load.audio("enemy-appear-3", "res/enemy-appear-3.wav");
        this.game.load.audio("enemy-appear-4", "res/enemy-appear-4.wav");
        this.game.load.image("particle", "res/particle.png");
        this.game.load.image("particle-small", "res/particle-small.png");
       
    };

    // @phaser
    p.create = function() {
        console.log("[PreloadState], create()");
        this.loadingBar.cropEnabled = false;
        this.state.start("MenuState");
        
    };

    // @phaser
    p.loadUpdate = function() {
        this.loadingText.text = "Loading: " + this.load.progress + "%";
    };
    

// Link
// ----
chongdashu.PreloadState = PreloadState;

}());


