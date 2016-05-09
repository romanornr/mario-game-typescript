var w = 720, h = 480;
var canvas;
var ctx;
var downForce = 2;
var gravitySpeed = 1.3;
var cObjects = (function () {
    function cObjects(position) {
        this.position = position;
    }
    ;
    cObjects.prototype.update = function () { };
    ;
    cObjects.prototype.collision = function () { };
    ;
    return cObjects;
}());
var Vector = (function () {
    function Vector(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    ;
    Vector.prototype.addVector = function (vector) {
        this._x = vector._x;
        this._y = vector._y;
    };
    Vector.prototype.x = function () { return this._x; };
    ;
    Vector.prototype.y = function () { return this._y; };
    ;
    return Vector;
}());
var Mario = (function () {
    function Mario(x, y) {
        var _this = this;
        if (x === void 0) { x = 70; }
        if (y === void 0) { y = 45; }
        this.drawImage = function () {
            ctx.save();
            ctx.beginPath();
            ctx.drawImage(marioImage, _this.x, _this.y);
            ctx.restore;
        };
        this.gravity = function () {
            mario.y += downForce;
            if (mario.y >= 415)
                mario.y = 415;
        };
        this.x = x;
        this.y = y;
    }
    return Mario;
}());
var marioImage = new Image();
marioImage.src = "graphics/mario/small/Standing-mario.gif";
var mario = new Mario(this.x, this.y);
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario.drawImage();
    mario.gravity();
}
function keyboardInput(event) {
    //a
    if (event.keyCode == 37 || event.keyCode == 65) {
        mario.x -= 10;
    }
    else if (event.keyCode == 38 || event.keyCode == 87) {
        mario.y -= 30;
    }
    else if (event.keyCode == 39 || event.keyCode == 68) {
        mario.x += 10;
    }
    else if (event.keyCode == 40 || event.keyCode == 83) {
        mario.y += 10;
    }
    else if (event.keyCode == 32) {
    }
}
window.onload = function () {
    canvas = document.getElementById('canvas');
    document.addEventListener('keydown', keyboardInput);
    ctx = canvas.getContext("2d");
    gameLoop();
};
//# sourceMappingURL=game.js.map