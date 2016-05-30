var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
var w = 720, h = 480;
var canvas;
var ctx;
var downForce = 2;
var gravitySpeed = 1.3;
var Game = (function () {
    function Game() {
        this.controls = {
            left: false,
            up: false,
            right: false,
            down: false,
        };
    }
    Game.prototype.setScreen = function () {
        this.screenwith = 720;
        this.sceenheight = 480;
    };
    return Game;
}());
var CameraView = (function () {
    function CameraView() {
    }
    CameraView.prototype.setCamera = function () {
        this.xView = 0;
        this.yView = 0;
    };
    return CameraView;
}());
var GameItem = (function () {
    function GameItem(position) {
        this.position = position;
    }
    GameItem.prototype.setSpriteUrl = function (input) {
        this.sprite = new Image();
        this.sprite.src = input;
    };
    GameItem.prototype.addGravity = function () {
        this.position.y += downForce;
        if (this.position.y >= 415)
            this.position.y = 415;
    };
    GameItem.prototype.drawSprite = function () {
        this.frameHeight = this.sprite.height;
        this.frameWidth = this.sprite.width;
        ctx.drawImage(this.sprite, this.position.x, this.position.y);
    };
    return GameItem;
}());
var Character = (function () {
    function Character(position, numberOfFrames) {
        this.position = position;
        this.numberOfFrames = numberOfFrames;
        this.ticksPerFrame = 1;
    }
    Character.prototype.setSpriteUrl = function (input) {
        this.sprite = new Image();
        this.sprite.src = input;
    };
    Character.prototype.addGravity = function () {
        this.position.y += downForce;
        if (this.position.y >= 415)
            this.position.y = 415;
    };
    Character.prototype.drawSprite = function () {
        this.tickCount = this.ticksPerFrame;
        if (this.tickCount >= this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            }
            else {
                this.frameIndex = 0;
            }
        }
        this.frameHeight = this.sprite.height;
        this.frameWidth = this.sprite.width / this.numberOfFrames;
        ctx.drawImage(this.sprite, this.frameIndex * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.position.x, this.position.y, 15, 20);
    };
    return Character;
}());
var mario = new Character(new Vector(40, 50), 4);
var pipe = new GameItem(new Vector(50, 415));
pipe.setSpriteUrl("graphics/assorted/Pipe-head.gif");
mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
mario.numberOfFrames = 1;
var COLLIDER;
(function (COLLIDER) {
    COLLIDER[COLLIDER["RECTANGLE"] = 0] = "RECTANGLE";
    COLLIDER[COLLIDER["CIRCLE"] = 1] = "CIRCLE";
    COLLIDER[COLLIDER["POLYGON"] = 2] = "POLYGON";
    COLLIDER[COLLIDER["COMPOUND"] = 3] = "COMPOUND";
})(COLLIDER || (COLLIDER = {}));
var RectangleCollider = (function () {
    function RectangleCollider(position, witdh, height) {
        this.position = position;
        this.witdh = witdh;
        this.height = height;
        this.colliderType = COLLIDER.RECTANGLE;
        this.ColliderType = COLLIDER.RECTANGLE;
        this.coord.push(position);
        var x2 = position.x + witdh;
        var y2 = position.y;
        this.coord.push(new Vector(x2, y2));
        var x3 = position.x + witdh;
        var y3 = position.y - height;
        this.coord.push(new Vector(x3, y3));
        var x4 = position.x;
        var y4 = position.y - height;
        this.coord.push(new Vector(x4, y4));
    }
    RectangleCollider.prototype.hit = function (obj) {
        if (obj.colliderType == COLLIDER.RECTANGLE) {
            return Collision.RectangleCollision(this, obj);
        }
        return false;
    };
    return RectangleCollider;
}());
var Collision = (function () {
    function Collision() {
    }
    Collision.RectangleCollision = function (a, b) {
        var xoverlap = false;
        var yoverlap = false;
        if (a.position.x <= b.position.x) {
            if (a.position.x + a.dimension.x >= b.position) {
                xoverlap = true;
            }
        }
    };
    return Collision;
}());
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario.drawSprite();
    pipe.drawSprite();
    mario.addGravity();
}
function keyboardInput(event) {
    switch (event.keyCode) {
        case 65:
        case 37:
            mario.setSpriteUrl("graphics/mario/small/Running-mario-left.gif");
            mario.numberOfFrames = 4;
            mario.position.x -= 10;
            break;
        case 38:
        case 87:
            mario.numberOfFrames = 1;
            mario.setSpriteUrl("graphics/mario/small/Jumping-mario.gif");
            if (mario.position.y < 415) {
                return false;
            }
            mario.position.y -= 30;
            break;
        case 39:
        case 68:
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.numberOfFrames = 4;
            mario.position.x += 10;
            break;
        case 40:
        case 83:
            mario.position.y += 20;
            break;
        case 32:
            break;
        default:
            mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
            mario.numberOfFrames = 1;
            break;
    }
}
function keyboardInput_release(event) {
    switch (event.keyCode) {
        case 65:
        case 37:
            mario.setSpriteUrl("graphics/mario/small/Standing-mario-left.gif");
            mario.numberOfFrames = 1;
            break;
        case 38:
        case 87:
            break;
        case 39:
        case 68:
        case 40:
        case 83:
            mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
            mario.numberOfFrames = 1;
            break;
    }
}
window.onload = function () {
    canvas = document.getElementById('canvas');
    document.addEventListener('keydown', keyboardInput);
    document.addEventListener('keyup', keyboardInput_release);
    ctx = canvas.getContext("2d");
    gameLoop();
};
//# sourceMappingURL=game.js.map