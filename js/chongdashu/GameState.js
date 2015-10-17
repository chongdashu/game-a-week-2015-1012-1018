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
    p.groups = [];
    
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
        this.createEnemy();
        this.createSystems();
        this.createDebug();
        this.createAudio();
    };

    p.createAudio = function() {

    };

    p.createPhysics = function() {
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  Set the world (global) gravity
        this.game.physics.arcade.gravity.y = GLOBAL_GRAVITY;
    };

    p.createEnemy = function() {
        var enemy = this.enemyGroup.create(-160+32, -96, "enemy");
        enemy.anchor.set(0.5, 0.5);
        
        var enemyIdleAnim = enemy.animations.add("idle", [0,1], 4, true);
        var enemyKillAnim = enemy.animations.add("kill", [1,2,3,4], 24);

        enemyKillAnim.onComplete.add(function(entity) {
            entity.kill();
            this.enemyGroup.remove(entity);
        }, this);
        
        enemy.animations.play("idle");

        this.game.physics.arcade.enable(enemy);

        enemy.body.collideWorldBounds = true;
        enemy.body.allowGravity = false;
        enemy.body.bounce.set(1,0);
        enemy.body.velocity.set(50,0);

        new chongdashu.EnemyComponent().addTo(enemy);
        new chongdashu.HealthComponent().addTo(enemy);
        new chongdashu.AudioComponent(this.game).addTo(enemy);
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
        this.player.body.facingX = Phaser.LEFT;

        new chongdashu.KeyboardComponent(this.game.input.keyboard).addTo(this.player);
        new chongdashu.AimingComponent(this.player).addTo(this.player);
        new chongdashu.AudioComponent(this.game).addTo(this.player);

    };

    p.createSystems = function() {
        this.systems.push(this.movementSystem  = new chongdashu.MovementSystem(this));
        this.systems.push(this.jumpingSystem  = new chongdashu.JumpingSystem(this));
        this.systems.push(this.arrowShootingSystem  = new chongdashu.ArrowShootingSystem(this));
        this.systems.push(this.enemySystem  = new chongdashu.EnemySystem(this));
    };

    p.createGroups = function() {
        this.groups = [];

        this.groups.push(this.backgroundGroup = this.game.add.group());
        this.groups.push(this.groundGroup = this.game.add.group());
        this.groups.push(this.agentGroup = this.game.add.group());
        this.groups.push(this.enemyGroup = this.game.add.group());
        this.groups.push(this.arrowGroup = this.game.add.group());
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
        if (this.agentGroup && this.groundGroup) {
            this.game.physics.arcade.collide(this.agentGroup, this.groundGroup, this.onAgentGroundCollide, null, this);
        }
        if (this.arrowGroup && this.enemyGroup) {
            this.game.physics.arcade.collide(this.arrowGroup, this.enemyGroup, this.onArrowEnemyCollide, null, this);
        }
        if (this.arrowGroup && this.enemyGroup) {
            this.game.physics.arcade.collide(this.arrowGroup, this.groundGroup, null, this.onArrowGroundCollide, this);
        }
    };

    p.onArrowGroundCollide = function(arrow, ground) {
        if (this.arrowShootingSystem) {
            this.arrowShootingSystem.onArrowGroundCollide(arrow,ground);
        }
    };

    p.onAgentGroundCollide = function(agent, ground) {
        if (this.jumpingSystem) {
            this.jumpingSystem.onAgentGroundCollide(agent,ground);
        }
    };

    p.onArrowEnemyCollide = function(arrow, enemy) {
        if (this.enemySystem) {
            this.enemySystem.onArrowEnemyCollide(arrow, enemy);
        }
        if (this.arrowShootingSystem) {
            this.arrowShootingSystem.onArrowEnemyCollide(arrow, enemy);
        }
    };

    p.updateSystems = function() {
        var self = this;
        $.each(this.groups, function(index, group){
            group.forEach(function(entity) {
                if (entity.komponents) {
                    $.each(entity.komponents, function(key, component) {
                        component.update();
                    });
                    $.each(self.systems, function(index, system) {
                        system.update(entity);
                    });
                }
            });
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


