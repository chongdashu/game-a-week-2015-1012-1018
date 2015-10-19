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
        this.game.load.script('invert', 'lib/phaser/filters/pixi/InvertFilter.js');
        this.game.load.script('displacement', 'lib/phaser/filters/pixi/DisplacementFilter.js');
        this.game.load.script('gray', 'lib/phaser/filters/Gray.js');
       
        // this.displacementTexture = PIXI.Texture.fromImage("res/displacement.png");

    };

    // @phaser
    p.create = function() {
        this.createPhysics();
        this.createGroups();
        this.createBackground();
        this.createGround();
        this.createPlayer();
        this.createSystems();
        // this.createDebug();
        this.createAudio();
        this.createEmitters();
        this.createTimers();
        this.createPlugins();
        this.createFilters();
        this.createText();

        this.remainingGameTime = 60000;

        game.canvas.style['display'] = '';
    };

    p.createText = function() {
        var titleStyle = {
            font: "12pt Consolas",
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 2
        };

        var remainingStyle = {
            font: "12pt Consolas",
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            stroke: "black",
            strokeThickness: 2
        };

        this.scoreText = this.game.add.text(GLOBAL_GAME_WIDTH/2-64, -GLOBAL_GAME_HEIGHT/2 + 32, "Score", titleStyle);
        this.scoreText.anchor.setTo(0.5, 0.5);

        this.remainingTimeText = this.game.add.text(0, +GLOBAL_GAME_HEIGHT/2 - 8, "Time Remaining", remainingStyle);
        this.remainingTimeText.anchor.setTo(0.5, 0.5);
    };

    p.createEmitters = function() {
        this.enemyEmitter = this.game.add.emitter(-160, -120, 250);
        this.enemyEmitter.enableBody = true;
        this.enemyEmitter.minParticleSpeed.setTo(-250, -400);
        this.enemyEmitter.makeParticles("particle");
        this.enemyEmitter.bounce.set(0.1,0.1);
        this.enemyEmitter.forEach(function(particle) {
            particle.tint = "0xFF0000";
        }, this);

        this.groundEmitter = this.game.add.emitter(0, 0, 250);
        this.groundEmitter.width=16;
        this.groundEmitter.makeParticles("particle-small");
        this.groundEmitter.minParticleSpeed.set(-20, -200);
        // this.groundEmitter.maxParticleSpeed.set(0, 0);
        this.groundEmitter.enableBody = false;
        // this.groundEmitter.gravity = -1000;
        this.groundEmitter.forEach(function(particle) {
            particle.tint = "0x0fdb6a";
        }, this);
    };

    p.createAudio = function() {

    };

    p.createFilters = function() {
        var fragmentSrc = [

                "precision mediump float;",

                "uniform float     time;",
                "uniform vec2      resolution;",
                "uniform vec2      mouse;",

                "float noise(vec2 pos) {",
                    "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
                "}",

                "void main( void ) {",

                    "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
                    "float pos = (gl_FragCoord.y / resolution.y);",
                    "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
                    "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

                    "pos -= (distortion * distortion) * 0.1;",

                    "float c = sin(pos * 400.0) * 0.4 + 0.4;",
                    "c = pow(c, 0.2);",
                    "c *= 0.2;",

                    "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
                    "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

                    "c += distortion * 0.08;",
                    "// noise",
                    "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",


                    "gl_FragColor = vec4( 0.0, c, 0.0, 1.0 );",
                "}"
            ];

            this.vduFilter = new Phaser.Filter(game, null, fragmentSrc);
            this.vduFilter.setResolution(640, 480);

            // this.invertFilter = game.add.filter("InvertFilter");
            this.invertFilter = new PIXI.InvertFilter("InvertFilter");
            this.enemyGroup.filters = [this.invertFilter];

            // this.displacementTexture = PIXI.Sprite.fromImage("res/displacement.png");
            // this.displacementTexture = this.game.add.image(0,0,"displacement");
            this.displacementTexture = this.game.make.sprite(0,0,"displacement");
            this.displacementTexture.anchor.set(0.5, 0.5);
            this.displacementTexture.texture.scaleMode = 0;
            this.displacementFilter = new PIXI.DisplacementFilter(this.displacementTexture.texture);
            this.displacementTexture.texture.scaleMode = 2;
            this.displacementFilter.scale = new Phaser.Point(1, 1);
            tmp = this.displacementFilter;

            // this.a = this.game.add.sprite(0,0, "displacement");

            // this.background.filters = [ this.vduFilter ];
            this.player.filters = [this.displacementFilter];
    };

    p.createPlugins = function() {
        this.juicy = this.game.plugins.add(new Phaser.Plugin.Juicy(this));
        this.screenShake = this.game.plugins.add(new Phaser.Plugin.ScreenShake(this));
        this.screenShake.setup({
            cameraOffsetX : -GLOBAL_GAME_WIDTH/2,
            cameraOffsetY : -GLOBAL_GAME_HEIGHT/2
        });

        this.game.camera.setPosition(-GLOBAL_GAME_WIDTH/2, -GLOBAL_GAME_HEIGHT/2);
        this.game.camera.setSize(GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT);
    };

    p.createPhysics = function() {
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  Set the world (global) gravity
        this.game.physics.arcade.gravity.y = GLOBAL_GRAVITY;
    };

    p.createEnemy = function(i) {
        var enemyX = this.game.rnd.pick([-GLOBAL_GAME_WIDTH/2, 0,  GLOBAL_GAME_WIDTH/2]);
        var enemyY = this.game.rnd.pick([-GLOBAL_GAME_HEIGHT/2+32]);

        if (this.enemyGroup.length > 3 || this.game.rnd.frac() > 0.75) {
            enemyY += 48;
        }

        if (this.game.rnd.frac() > 0.75) {
            enemyY += 48;
        }

        enemyX += i * 48;

        var enemy = this.enemyGroup.create(enemyX, enemyY, "enemy");
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
        enemy.body.immovable = true;

        enemy.scale.set(0.0,0.0);

        enemy.appearTween = this.game.add.tween(enemy.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Elastic.Out);
        enemy.appearTween.delay(i * 500);
        enemy.appearTween.onStart.add(function() {
            var auc = enemy.komponents[chongdashu.AudioComponent.TYPE];
            if (auc) {
                auc.play("enemy-appear-" + (i+1).toString());
            }
        });
        enemy.appearTween.onComplete.add(function() {
            enemy.appearTween = null;
            
        });
        enemy.appearTween.start();

        new chongdashu.EnemyComponent().addTo(enemy);
        new chongdashu.HealthComponent().addTo(enemy);
        
        new chongdashu.AudioComponent(this.game).addTo(enemy);

        

        return enemy;
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
        this.groups.push(this.textGroup = this.game.add.group());
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

    p.createTimers = function() {
        this.enemySpawnTimer = this.game.time.create(false);
        this.enemySpawnTimer.loop(this.game.rnd.between(1000,2500), function() {
            var nEnemies = this.game.rnd.weightedPick([1,2,3]);
            var enemy = null;
            var auc = null;
            if (this.enemyGroup.length < 5) {
                for (var i=0; i < nEnemies; i++) {
                    enemy = this.createEnemy(i);
                    auc = enemy.komponents[chongdashu.AudioComponent.TYPE];
                }
            }
            
            
        }, this);
        this.enemySpawnTimer.start();

        this.gameTimer = this.game.time.create(true);
        this.gameTimer.loop(1000, function() {
            this.remainingGameTime -= 1000;
            if (this.remainingGameTime <= 0) {
                this.onAgentEnemyCollide();
                this.gameTimer.stop();
            }
        }, this);
        this.gameTimer.start();
    };

    // @phaser
    p.update = function() {
        this.updatePhysics();
        this.updateSystems();
        this.updateWorld();
        this.updatePlugins();
        this.updateText();
        this.updateFilters();
    };

    p.updateText = function() {
        this.scoreText.setText("Score: " + this.enemySystem.enemiesKilled);
        this.remainingTimeText.setText(this.remainingGameTime/1000 + "s remaining...");
    };

    p.updateFilters = function() {
        this.vduFilter.update();
        this.invertFilter.invert = this.game.rnd.between(0.1,0.9);
        
    };

    p.updatePlugins = function() {
    };

    p.updateWorld = function() {

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
        if (this.enemyEmitter && this.groundGroup) {
            this.game.physics.arcade.collide(this.enemyEmitter, this.groundGroup);
        }
        // if (this.agentGroup && this.enemyGroup) {
        //     this.game.physics.arcade.collide(this.agentGroup, this.enemyGroup, this.onAgentEnemyCollide, null, this);
        // }

        if (this.enemyGroup) {
            this.game.physics.arcade.collide(this.enemyGroup);
        }

    };

    p.onAgentEnemyCollide = function(agent, enemy) {
        var self = this;
        if (this.game.time.slowMotion === 1.0 && !this.game.physics.arcade.isPaused) {
            if (this.movementSystem) {
                this.movementSystem.enabled = false;
            }
            if (this.jumpingSystem) {
                this.jumpingSystem.enabled = false;
            }
            if (this.arrowShootingSystem) {
                this.arrowShootingSystem.enabled = false;
            }

            if (this.juicy) {
                var flash = this.juicy.createScreenFlash("red");
                this.game.add.existing(flash);
                flash.anchor.set(0.5);
                flash.flash();
            }

            // juice: sleep
            var timer = this.game.time.create(true);
            this.game.physics.arcade.isPaused = true;

            var hurt = this.game.add.audio("enemy-hurt");
            hurt.play();

            timer.add(this.game.rnd.between(100,125), function() {
                var kill = self.game.add.audio("player-kill-2");
                kill.play();
                self.game.time.slowMotion = 5.0;

                self.game.physics.arcade.isPaused = false;

                self.player.body.velocity.y = -1500;
                // this.player.body.gravity = 100;
                self.player.body.angularVelocity = 720;
                self.player.collideWorldBounds = false;
            });
            timer.start();

            var endtween = this.game.add.tween(this.world).to({
                "alpha" : 0
            }, 2000/5, Phaser.Easing.Linear.In, true);

            endtween.onComplete.add(function() {
                self.game.time.slowMotion = 1.0;
                self.world.alpha = 1.0;
                self.game.state.start("MenuState");
            });

            return true;

        }

        return false;
        
    };

    p.onArrowGroundCollide = function(arrow, ground) {
        if (this.arrowShootingSystem) {
            this.arrowShootingSystem.onArrowGroundCollide(arrow,ground);
        }
    };

    p.onAgentGroundCollide = function(agent, ground) {
        if (this.jumpingSystem && this.jumpingSystem.enabled) {
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
        // this.game.debug.cameraInfo(game.camera, 32, 32);
        // this.enemyEmitter.forEachAlive(function(particle) {
              // game.debug.body(particle,'green',false);
              // game.debug.spriteBounds(particle, 'pink', false);
        // });
        pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
    };

    

// Link
// ----
chongdashu.GameState = GameState;

}());


