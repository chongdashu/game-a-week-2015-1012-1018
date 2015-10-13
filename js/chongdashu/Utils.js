/**
 * 
 * Copyright (c) Chong-U Lim
 * http://github.com/chongdashu
 */
this.chongdashu = this.chongdashu||{};

(function() {
    "use strict";

/**
 * Utils
 * @class Utils
 * @constructor
 **/
var Utils = function(entity) {
};

/**
 * Credits goes to CreateJS
 * http://www.createjs.com/docs/easeljs/files/createjs_utils_extend.js.html#l40
 *
 * Sets up the prototype chain and constructor property for a new class.
 *
 * This should be called right after creating the class constructor.
 *
 *  function MySubClass() {}
 *  createjs.extend(MySubClass, MySuperClass);
 *  MySubClass.prototype.doSomething = function() { }
 *
 *  var foo = new MySubClass();
 *  console.log(foo instanceof MySuperClass); // true
 *  console.log(foo.prototype.constructor === MySubClass); // true
 *
 * @method extend
 * @param {Function} subclass The subclass.
 * @param {Function} superclass The superclass to extend.
 * @return {Function} Returns the subclass's new prototype.
 */
Utils.extend = function(subclass, superclass) {
    "use strict";
 
    function o() { this.constructor = subclass; }
    o.prototype = superclass.prototype;
    return (subclass.prototype = new o());
};

/**
 * Credits goes to CreateJS
 * http://www.createjs.com/docs/easeljs/files/createjs_utils_extend.js.html#l40
 *
 * Promotes any methods on the super class that were overridden, by creating an alias in the format `prefix_methodName`.
 * It is recommended to use the super class's name as the prefix.
 * An alias to the super class's constructor is always added in the format `prefix_constructor`.
 * This allows the subclass to call super class methods without using `function.call`, providing better performance.
 *
 * For example, if `MySubClass` extends `MySuperClass`, and both define a `draw` method, then calling `promote(MySubClass, "MySuperClass")`
 * would add a `MySuperClass_constructor` method to MySubClass and promote the `draw` method on `MySuperClass` to the
 * prototype of `MySubClass` as `MySuperClass_draw`.
 *
 * This should be called after the class's prototype is fully defined.
 *
 *  function ClassA(name) {
 *      this.name = name;
 *  }
 *  ClassA.prototype.greet = function() {
 *      return "Hello "+this.name;
 *  }
 *
 *  function ClassB(name, punctuation) {
 *      this.ClassA_constructor(name);
 *      this.punctuation = punctuation;
 *  }
 *  createjs.extend(ClassB, ClassA);
 *  ClassB.prototype.greet = function() {
 *      return this.ClassA_greet()+this.punctuation;
 *  }
 *  createjs.promote(ClassB, "ClassA");
 *
 *  var foo = new ClassB("World", "!?!");
 *  console.log(foo.greet()); // Hello World!?!
 *
 * @method promote
 * @param {Function} subclass The class to promote super class methods on.
 * @param {String} prefix The prefix to add to the promoted method names. Usually the name of the superclass.
 * @return {Function} Returns the subclass.
 */
Utils.promote = function(subclass, prefix) {
    "use strict";
 
    var subP = subclass.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
    if (supP) {
        subP[(prefix+="_") + "constructor"] = supP.constructor; // constructor is not always innumerable
        for (var n in supP) {
            if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) { subP[prefix + n] = supP[n]; }
        }
    }
    return subclass;
};

    

// Link
// ----
chongdashu.Utils = Utils;

}());


