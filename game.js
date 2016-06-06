var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Camera = (function () {
    function Camera() {
    }
    Camera.prototype.View = function () {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
    };
    Camera.prototype.moveCam = function (canvas) {
        canvas.style.left += 12;
    };
    return Camera;
}());
var COLLIDER;
(function (COLLIDER) {
    COLLIDER[COLLIDER["RECTANGLE"] = 0] = "RECTANGLE";
    COLLIDER[COLLIDER["CIRCLE"] = 1] = "CIRCLE";
    COLLIDER[COLLIDER["POLYGON"] = 2] = "POLYGON";
    COLLIDER[COLLIDER["COMPOUND"] = 3] = "COMPOUND";
})(COLLIDER || (COLLIDER = {}));
var TYPES;
(function (TYPES) {
    TYPES[TYPES["CHARACTER"] = 0] = "CHARACTER";
    TYPES[TYPES["GAMEITEM"] = 1] = "GAMEITEM";
})(TYPES || (TYPES = {}));
var RectangleCollider = (function () {
    function RectangleCollider(position) {
        this.position = position;
        this.colliderType = COLLIDER.RECTANGLE;
        this.ColliderType = COLLIDER.RECTANGLE;
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
        console.log(a.position.x);
        if (a.position.x <= b.position.x) {
            if (a.position.x + a.position.xDimension() >= b.position.x) {
                xoverlap = true;
            }
        }
        else {
            if (b.position.x + b.position.xDimension() >= a.position.x) {
                xoverlap = true;
            }
        }
        if (a.position.y <= b.position.y) {
            if (a.position.y + a.position.yDimension() >= b.position.y) {
                yoverlap = true;
            }
        }
        else {
            if (b.position.y + b.position.yDimension() >= a.position.y) {
                yoverlap = true;
            }
        }
        if (xoverlap == true && yoverlap == true) {
            console.log('col');
            return true;
        }
        return false;
    };
    return Collision;
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
    GameItem.prototype.collide = function () {
        return new RectangleCollider(this.position);
    };
    return GameItem;
}());
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(position, numberOfFrames) {
        _super.call(this, position);
        this.numberOfFrames = numberOfFrames;
        this.ticksPerFrame = 1;
    }
    ;
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
        this.position.setWidth(this.frameWidth);
        this.position.getHeight(this.frameHeight);
        ctx.drawImage(this.sprite, this.frameIndex * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.position.x, this.position.y, 15, 20);
    };
    return Character;
}(GameItem));
var Vector = (function () {
    function Vector(x, y) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.magnitude = function () {
            return Math.sqrt(_this.xDimension() * _this.xDimension() + _this.yDimension() * _this.yDimension());
        };
        this.normalize = function () {
            var len = Math.sqrt(_this.xDimension() * _this.xDimension() + _this.yDimension() * _this.yDimension());
            _this.x = (_this.x + _this.frameWidth) / len;
            _this.y = (_this.x + _this.frameHeight) / len;
            return;
        };
    }
    Vector.prototype.setWidth = function (frameWidth) {
        this.frameWidth = frameWidth;
    };
    Vector.prototype.getHeight = function (frameHeigth) {
        this.frameHeight = frameHeigth;
    };
    Vector.prototype.xDimension = function () {
        return this.x + this.frameWidth;
    };
    Vector.prototype.yDimension = function () {
        return this.y + this.frameHeight;
    };
    return Vector;
}());
var canvas;
var ctx;
var downForce = 2;
var gravitySpeed = 1.3;
var view = new Camera();
var canvas = document.createElement('canvas');
view.x = 0;
view.y = 0;
view.width = canvas.width = 720;
view.height = canvas.height = 480;
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
var mario = new Character(new Vector(40, 50), 4);
var pipe = new GameItem(new Vector(50, 415));
pipe.setSpriteUrl("graphics/assorted/Pipe-head.gif");
mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
mario.numberOfFrames = 1;
function gameLoop() {
    ctx.clearRect(0, 0, view.width, view.height);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, view.width, view.height);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, view.height - 45, view.width, 45);
    mario.drawSprite();
    pipe.drawSprite();
    mario.addGravity();
    mario.collide();
    pipe.collide();
    requestAnimationFrame(gameLoop);
    if (Collision.RectangleCollision(mario.collide(), pipe.collide())) {
        console.log('rekt!');
    }
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
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    document.addEventListener('keydown', keyboardInput);
    document.addEventListener('keyup', keyboardInput_release);
    gameLoop();
};
//# sourceMappingURL=game.js.map