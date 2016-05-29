var w = 720, h = 480;

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D; 
var downForce = 2;
var gravitySpeed = 1.3;

class Game {

    screenwith: number;
    sceenheight: number;

    controls = {
        left: false,
        up: false,
        right: false,
        down: false,
    }

    setScreen() {
        this.screenwith = 720;
        this.sceenheight = 480;
    }

    // stel gameworld hoogte en breedte in

    // method om floor hoogte te bepalen etc    

}

class CameraView {

    xView: number;
    yView: number;

    setCamera() {
        this.xView = 0;
        this.yView = 0;
        // this.axis = AXIS.BOTH;
        // this.viewportRect = new GameWorld(this.xView, this.yView, w, h);
    }


}

class GameItem {

    frameWidth: number;
    frameHeight: number; 

    constructor(public _x: number, public _y: number) {
        this._x = _x;
        this._y = _y;
    };

    sprite: HTMLImageElement;


    setSpriteUrl(input: string): void {
        this.sprite = new Image();
        this.sprite.src = input;
    }

    addGravity(): void {

        this._y += downForce;
        if (this._y >= 415)
            this._y = 415;
    }

    drawSprite(): void {

        this.frameHeight = this.sprite.height;
        this.frameWidth = this.sprite.width;

        ctx.drawImage(this.sprite, this._x, this._y);
        
        //loop die checkt of de repeatHeight of repeatWidth true of false is
        // loop die de width of height vult
        // dus eerst X as 

        /*
            if repeatWidth
                for (int i = spritewidth; i <= repeatwidth; i += spritewidth)
                    teken op x of y as



        */


    }

}


class Character {

    frameWidth: number;
    frameHeight: number; 
    tickCount: number;
    ticksPerFrame: number = 1;
    frameIndex: number;
    jump: boolean;

    constructor(public _x: number, public _y: number, public numberOfFrames : number) {
        this._x = _x;
        this._y = _y;
    };

    sprite: HTMLImageElement;


    setSpriteUrl(input: string) : void {
        this.sprite = new Image();
        this.sprite.src = input;
    }

    addGravity(): void {

        this._y += downForce;
        if (this._y >= 415)
            this._y = 415;
    }

    drawSprite(): void {

        this.tickCount = this.ticksPerFrame;

        if (this.tickCount >= this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }

        this.frameHeight = this.sprite.height;
        this.frameWidth = this.sprite.width / this.numberOfFrames;

        ctx.drawImage(this.sprite,
            this.frameIndex * this.frameWidth, 0,   // Start of slice
            this.frameWidth, this.frameHeight, // Size of slice
            this._x, this._y, 15, 20);
    }
}

var mario = new Character(40, 50, 4);

var pipe = new GameItem(50, 415)
pipe.setSpriteUrl("graphics/assorted/Pipe-head.gif");


// setup screen elements here
mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
mario.numberOfFrames = 1;

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

    if (mario._x < pipe._x + pipe.frameWidth &&
        mario._x + mario.frameWidth > pipe._x &&
        mario._y < pipe._y + pipe.frameHeight &&
        mario.frameHeight + mario._y > pipe._y) {
        console.log('collision detected');
    }

}

function keyboardInput(event: KeyboardEvent) {

    switch (event.keyCode) {
        case 65: case 37: //a
            mario.setSpriteUrl("graphics/mario/small/Running-mario-left.gif");
            mario.numberOfFrames = 4;
            mario._x -= 10;
            break;

        case 38: case 87: //w
            mario.numberOfFrames = 1;
            mario.setSpriteUrl("graphics/mario/small/Jumping-mario.gif");
            if(mario._y < 415) {
                return false;
            }
            mario._y -= 30;
            break;
        case 39: case 68: //d
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.numberOfFrames = 4;
            mario._x += 10;
            break;
        case 40: case 83: //s
            mario._y += 20;
            break;
        case 32: //space
            break;
        default:
            mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
            mario.numberOfFrames = 1;
            break;      
    }

}

function keyboardInput_release(event: KeyboardEvent){
    switch (event.keyCode) {
        case 65: case 37: //a
            mario.setSpriteUrl("graphics/mario/small/Standing-mario-left.gif");
            mario.numberOfFrames = 1;
            break;
        case 38: case 87: //w
          // test.controls.up = true;
            break;
        case 39: case 68: //d
           // test.controls.right = true;
            //console.log(test.controls.right);
        case 40: case 83: //s
           // test.controls.down = true;
            mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
            mario.numberOfFrames = 1;
            break;
    }
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('canvas');

    document.addEventListener('keydown', keyboardInput);
    document.addEventListener('keyup', keyboardInput_release)

    ctx = canvas.getContext("2d");
    gameLoop();
}