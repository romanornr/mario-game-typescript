var w = 720, h = 480;
var canvas;
var ctx;
var downForce = 2;
var gravitySpeed = 1.3;
var GameWorld = (function () {
    function GameWorld() {
    }
    GameWorld.prototype.setScreen = function () {
        this.screenwith = 720;
        this.sceenheight = 480;
    };
    return GameWorld;
}());
var GameItem = (function () {
    function GameItem() {
    }
    GameItem.prototype.drawItem = function () {
        ctx.save();
        ctx.beginPath();
        //loop die checkt of de repeatHeight of repeatWidth true of false is
        // loop die de width of height vult
        // dus eerst X as 
        /*
            if repeatWidth
                for (int i = spritewidth; i <= repeatwidth; i += spritewidth)
                    teken op x of y as



        */
    };
    return GameItem;
}());
var Character = (function () {
    function Character(_x, _y, numberOfFrames) {
        this._x = _x;
        this._y = _y;
        this.numberOfFrames = numberOfFrames;
        this.ticksPerFrame = 1;
        this._x = _x;
        this._y = _y;
    }
    ;
    Character.prototype.setSpriteUrl = function (input) {
        this.sprite = new Image();
        this.sprite.src = input;
    };
    Character.prototype.addGravity = function () {
        this._y += downForce;
        if (this._y >= 415)
            this._y = 415;
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
        ctx.drawImage(this.sprite, this.frameIndex * this.frameWidth, 0, // Start of slice
        this.frameWidth, this.frameHeight, // Size of slice
        this._x, this._y, 15, 20);
    };
    return Character;
}());
var mario = new Character(40, 50, 4);
// setup screen elements here
mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
mario.numberOfFrames = 1;
function gameLoop() {
    //game behavior here
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario.drawSprite();
    mario.addGravity();
}
function keyboardInput(event) {
    switch (event.keyCode) {
        case 65:
        case 37:
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.numberOfFrames = 4;
            mario._x -= 10;
            break;
        case 38:
        case 87:
            mario.setSpriteUrl("graphics/mario/small/Jumping-mario.gif");
            mario.numberOfFrames = 1;
            mario._y -= 30;
            break;
        case 39:
        case 68:
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.numberOfFrames = 4;
            mario._x += 10;
            break;
        case 40:
        case 83:
            mario._y += 20;
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
        case 37: //a
        case 38:
        case 87: //w
        case 39:
        case 68: //d
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