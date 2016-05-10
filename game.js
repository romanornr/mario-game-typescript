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
    function Character(_x, _y, frameSize, index, nFrames) {
        if (frameSize === void 0) { frameSize = 200; }
        if (index === void 0) { index = 0; }
        if (nFrames === void 0) { nFrames = 30; }
        this._x = _x;
        this._y = _y;
        this.frameSize = frameSize;
        this.index = index;
        this.nFrames = 30;
        this._x = _x;
        this._y = _y;
        this.frameSize = frameSize;
        this.nFrames = nFrames;
        this.index = index;
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
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(this.sprite, this._x, this._y);
        ctx.restore;
    };
    Character.prototype.animateSprite = function () {
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(this.sprite, this._x, this._y, 30, 30, 0, 0, 20, 20);
        ctx.restore;
        // this._x += this.frameSize;
        // this.index += 1;
        // if(this.index >= this.nFrames){
        //     this._x = 0;
        //     this._y = 0;
        //     this.index = 0;
        // }
    };
    return Character;
}());
var mario = new Character(40, 50);
// setup screen elements here
mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
function gameLoop() {
    //game behavior here
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario.drawSprite();
    //mario.animateSprite();
    mario.addGravity();
}
function keyboardInput(event) {
    switch (event.keyCode) {
        case 65:
        case 37:
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.animateSprite();
            mario._x -= 10;
            break;
        case 38:
        case 87:
            mario._y -= 30;
            break;
        case 39:
        case 68:
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.animateSprite();
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
            mario.drawSprite();
            break;
    }
}
window.onload = function () {
    canvas = document.getElementById('canvas');
    document.addEventListener('keydown', keyboardInput);
    ctx = canvas.getContext("2d");
    gameLoop();
};
//# sourceMappingURL=game.js.map