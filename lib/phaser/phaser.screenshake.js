'use strict';

/**
* Plugin to make screen shake FX (makes number of short camera movements).
*
* Usage:
*   in main create function:
*     game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
*
*   in function where need to call shake FX:
*     game.plugins.screenShake.setup({ //if need to replace default plugin settings
*       shakeX: true,
*       shakeY: false
*     });
*     this.game.plugins.screenShake.shake(10); //pass shake count value
*
*
*
* @author       Dmitry Maslov <maslov.dmitrij@gmail.com>
* @copyright    2014 Dmitry Maslov
* @license      http://choosealicense.com/licenses/mit
*
*/
Phaser.Plugin.ScreenShake = function(game, parent){
  Phaser.Plugin.call(this, game, parent);

  //settings by default
  this._settings = {
    cameraOffsetX : 0,
    cameraOffsetY : 0,
    shakesCount: 0,
    shakeX: true,
    shakeY: true,
    sensCoef: 0.5
  };
this.game.camera.bounds = null;

  /**
  * screen shake FX.
  */
  this._moveCamera = function(){
    if(this._settings.shakesCount > 0){
      var sens = this._settings.shakesCount * this._settings.sensCoef;

      this.modifier = this.game.rnd.pick([1, 1]);

      if(this._settings.shakesCount % 2){
        this.game.camera.x += this._settings.shakeX ? (this.modifier * sens) : 0;
        this.game.camera.y += this._settings.shakeY ? (this.modifier * sens) : 0;
      }
      else{
        this.game.camera.x -= this._settings.shakeX ? (this.modifier * sens) : 0;
        this.game.camera.y -= this._settings.shakeY ? (this.modifier * sens) : 0;
      }

      this._settings.shakesCount--;

      if(this._settings.shakesCount === 0){
        this.game.camera.setPosition(this._settings.cameraOffsetX, this._settings.cameraOffsetY);
      }
    }
  };
};

Phaser.Plugin.ScreenShake.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.ScreenShake.prototype.constructor = Phaser.Plugin.ScreenShake;


/**
* Change default settings object values with passed object value.
*
* @method Phaser.Plugin.ScreenShake#setup
* @param {object} [obj] - Passed object to merge
*/
Phaser.Plugin.ScreenShake.prototype.setup = function(obj){
  this._settings = Phaser.Utils.extend(false, this._settings, obj);
};


/**
* Pass value of count shakes.
*
* @method Phaser.Plugin.ScreenShake#shake
* @param {number} [count] - Value of count shakes
*/
Phaser.Plugin.ScreenShake.prototype.shake = function(count){
  this._settings.shakesCount = count;
};

Phaser.Plugin.ScreenShake.prototype.update = function(){
  this._moveCamera();
};