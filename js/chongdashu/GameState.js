/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * GameState
 * @class GameState
 * @constructor
 **/
var GameState = function(game) {
};
var p = GameState.prototype;

    p.prototypes = null;
    p.dataIndex = 0;
    p.systems = [];
    
    // @phaser
    p.preload = function() {
       
    };

    // @phaser
    p.create = function() {
        this.createPhysics();
        this.createGroups();
        this.createBackground();
        this.createGround();
        this.createPlayer();
        this.createSystems();
        this.createDebug();

        tmp = new chongdashu.KeyboardComponent(this.player);
    };

    p.createPhysics = function() {
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  Set the world (global) gravity
        this.game.physics.arcade.gravity.y = GLOBAL_GRAVITY;
    };

    p.createPlayer = function() {
        this.player = this.agentGroup.create(16, 0, "player");
        this.player.anchor.set(0.5, 0.5);
        this.player.isJumping = true;

        this.game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = true;
        this.player.body.collideWorldBounds = true;
        this.player.body.maxVelocity = 10000;
        this.player.body.friction.set(0,10000);
        this.player.body.drag.set(1000,0);
        this.player.body.facingX = Phaser.RIGHT;
    };

    p.createSystems = function() {
        this.systems.push(this.spriteMovementSystem  = new chongdashu.SpriteMovementSystem(this));
        this.systems.push(this.arrowShootingSystem  = new chongdashu.ArrowShootingSystem(this));
    };

    p.createGroups = function() {
        this.backgroundGroup = this.game.add.group();
        this.groundGroup = this.game.add.group();
        this.agentGroup = this.game.add.group();
    };

    p.createBackground = function() {
        this.background = this.backgroundGroup.create(0,0, "background");
        this.background.anchor.set(0.5, 0.5);
    };

    p.createGround = function() {
        var x = 0;
        var y = GLOBAL_GAME_HEIGHT/2 - GLOBAL_TILE_HEIGHT/2;

        var tile = null;
        for (x=0; x < GLOBAL_GAME_WIDTH/GLOBAL_TILE_WIDTH; x++) {
            tile = this.groundGroup.create(-GLOBAL_GAME_WIDTH/2 + GLOBAL_TILE_WIDTH/2 + x*GLOBAL_TILE_WIDTH, y, "tile-brown");
            tile.anchor.set(0.5, 0.5);
            this.game.physics.arcade.enable(tile);
            tile.body.immovable = true;
            tile.body.allowGravity = false;
        }
    };

    p.createDebug = function() {
        // Create a bitmap the same size as the stage
        var bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        
        // These functions use the canvas context to draw lines using the canvas API
        for(var y = this.game.height-GLOBAL_TILE_HEIGHT; y >= 0; y -= GLOBAL_TILE_HEIGHT) {
            bitmap.context.beginPath();
            bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            bitmap.context.moveTo(0, y);
            bitmap.context.lineTo(this.game.width, y);
            bitmap.context.stroke();
        }

        this.game.add.image(-GLOBAL_GAME_WIDTH/2, -GLOBAL_GAME_HEIGHT/2, bitmap);
    };

    // @phaser
    p.update = function() {
        this.updatePhysics();
        this.updateSystems();
    };

    p.updatePhysics = function() {
        this.game.physics.arcade.collide(this.agentGroup, this.groundGroup, this.onAgentGroundCollide, null, this);
    };

    p.onAgentGroundCollide = function(agent, ground) {
        if (this.spriteMovementSystem) {
            this.spriteMovementSystem.onAgentGroundCollide(agent,ground);
        }
    };

    p.updateSystems = function() {
        $.each(this.systems, function(index, system) {
            system.update();
        });
    };

    // render
    p.render = function() {
        $.each(this.systems, function(index, system) {
             system.render();
        });
        pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
    };

    

// Link
// ----
chongdashu.GameState = GameState;

}());


