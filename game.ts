var w = 720, h = 480;

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D; 
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
class GameWorld {
    screenwith: number;
    sceenheight: number;

    setScreen() {
        this.screenwith = 720;
        this.sceenheight = 480;
    }

    // stel gameworld hoogte en breedte in

    // method om floor hoogte te bepalen etc    

}

class GameItem {

    // plaats items zoals pipes/obstacles

    // set gameitem image
    // set height
    // gameitem position etc


}

class Character {

    protected y_: number;
    protected x_: number;

    constructor(protected _x: number, protected _y: number) {
        this._x = _x;
        this._y = _y;
    };

    sprite: HTMLImageElement;

    setSpriteUrl(input: string) : void {
        this.sprite = new Image();
        this.sprite.src = input;
    }

    drawSprite() : void {
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(this.sprite, this._x, this._y)
        ctx.restore;
    }
   
}


var mario = new Character(40, 50);
mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");



function gameLoop(){
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

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('canvas');

    // document.addEventListener('keydown', keyboardInput)

    ctx = canvas.getContext("2d");
    gameLoop();
}