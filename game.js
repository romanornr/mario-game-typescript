var w = 720, h = 480;
var canvas;
var ctx;
var downForce = 2;
var gravitySpeed = 1.3;
// dit kan weg
// abstract class cObjects{   
//     constructor(protected position: Vector, protected _sprite:Sprite) { };
//     update(){};
//     collision() { };
//     sprite(): Sprite { return this._sprite };
// }
// class Vector { //deze class weg en behavoir in Character class
//     constructor(private _x: number, private _y: number) { };
//     x(): number { return this._x };
//     y(): number { return this._y };
//     setVector(vector: Vector){
//         this._x += vector.x();
//         this._y += vector.y();
//     }
// }
// Initialiseer 
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
    return GameItem;
}());
var Character = (function () {
    function Character(_x, _y) {
        this._x = _x;
        this._y = _y;
        this._x = _x;
        this._y = _y;
    }
    ;
    Character.prototype.setSpriteUrl = function (input) {
        this.sprite = input;
    };
    Character.prototype.drawSprite = function () {
        ctx.save();
        ctx.beginPath();
        var img = new Image();
        img.src = this.sprite;
        ctx.drawImage(img, this._x, this._y);
        ctx.restore;
    };
    return Character;
}());
var mario = new Character(40, 50);
mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario.drawSprite();
    //mario.gravity();
}
// function keyboardInput(event: KeyboardEvent){
//     //a
//     if(event.keyCode == 37 || event.keyCode == 65){
//         mario.x -= 10;
//     }
//     //w
//     else if (event.keyCode == 38 || event.keyCode == 87){
//         mario.y -= 30;
//     }
//     //d
//     else if (event.keyCode == 39 || event.keyCode == 68){
//         mario.x += 10;
//     }
//     //s
//     else if(event.keyCode == 40 || event.keyCode == 83){
//         mario.y += 10;
//     }
//     //space
//     else if (event.keyCode == 32){
//     }
// }
window.onload = function () {
    canvas = document.getElementById('canvas');
    // document.addEventListener('keydown', keyboardInput)
    ctx = canvas.getContext("2d");
    gameLoop();
};
//# sourceMappingURL=game.js.map