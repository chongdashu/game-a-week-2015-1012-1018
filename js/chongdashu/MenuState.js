/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * MenuState
 * @class MenuState
 * @constructor
 **/
var MenuState = function(game) {
};
var p = MenuState.prototype;
    

    // @phaser
    p.preload = function() {
        console.log("[MenuState], preload()");
        
    };

    // @phaser
    p.create = function() {
        console.log("[MenuState], create()");

        // Preloader specific stuff.
        // -------------------------
        this.game.world.setBounds(
            -GLOBAL_GAME_WIDTH/2,
            -GLOBAL_GAME_HEIGHT/2,
            GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT);

        this.game.camera.setPosition(-GLOBAL_GAME_WIDTH/2, -GLOBAL_GAME_HEIGHT/2);
        this.game.camera.setSize(GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT);
        
        var titleStyle = {
            font: "bold 24px Consolas",
            fill: "#ffaabb",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 4
        };
        var subtitleStyle = {
            font: "16px Consolas",
            fill: "#aaaabb",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 3
        };
        var instructionStyle = {
            font: "12px Consolas",
            fill: "#fefefe",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 1
        };
        var twitterText = {
            font: "11px Consolas",
            fill: "#aaaaff",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 1
        };
        var startStyle = {
            font: "12px Consolas",
            fill: "#fefefe",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 1
        };

        this.titleText = this.game.add.text(0, -64, "Arrow Madness", titleStyle);
        this.titleText.anchor.setTo(0.5, 0.5);
        this.subtitleText = this.game.add.text(0, -64+32, "#OGAW-1", subtitleStyle);
        this.subtitleText.anchor.setTo(0.5, 0.5);
        this.twitterText = this.game.add.text(0, 0, "@chongdashu", twitterText);
        this.twitterText.anchor.setTo(0.5, 0.5);
        
        this.startText = this.game.add.text(0, +96, "Click Anywhere To Begin", instructionStyle);
        this.startText.anchor.setTo(0.5, 0.5);
        
        this.instructionsText = this.game.add.text(0, +64, "Z: To Jump | X: to Shoot | Arrows: to Move", startStyle);
        this.instructionsText.anchor.setTo(0.5, 0.5);

        game.canvas.style['display'] = '';
        game.canvas.style['width'] = '640px';
        game.canvas.style['height'] = '480px';
        pixel.canvas.style['display'] = 'none';

        this.game.input.keyboard.onDownCallback = function() {
            game.canvas.style['display'] = 'none';
            pixel.canvas.style['display'] = '';
            game.canvas.style['width'] = '';
            game.canvas.style['height'] = '';
            
            this.game.state.start("GameState");
            this.game.input.keyboard.onDownCallback = null;
        };
    };

    // @phaser
    p.update = function() {
        // this.loadingText.text = "Loading: " + this.load.progress + "%";
        if (this.game.input.activePointer.isDown) {
            game.canvas.style['display'] = 'none';
            pixel.canvas.style['display'] = '';
            game.canvas.style['width'] = '';
            game.canvas.style['height'] = '';

            this.game.state.start("GameState");
            this.game.input.keyboard.onDownCallback = null;
        }
    };

    // @phaser
    p.render = function() {
        // game.debug.pointer(this.game.input.activePointer);
        pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);

    };
    

// Link
// ----
chongdashu.MenuState = MenuState;

}());


