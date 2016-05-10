var w = 720, h = 480;

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D; 
var downForce = 2;
var gravitySpeed = 1.3;

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

    public height: number;
    public width: number;

    public repeatHeight: boolean;
    public repeatWidth: boolean;

    sprite: HTMLImageElement;

    drawItem() : void {
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


    }

}

class Character {

    public y_: number;
    public x_: number;
    public nFrames: number = 30;

    constructor(public _x: number, public _y: number, public frameSize: number = 200, public index: number = 0, nFrames: number = 30) {
        this._x = _x;
        this._y = _y;
        this.frameSize = frameSize;
        this.nFrames = nFrames;
        this.index = index;
    };

    sprite: HTMLImageElement;

    setSpriteUrl(input: string) : void {
        this.sprite = new Image();
        this.sprite.src = input;
    }

    addGravity() : void {

        this._y += downForce;
        if (this._y >= 415)
            this._y = 415;
    }


    drawSprite(): void {
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(this.sprite, this._x, this._y)
        ctx.restore;
    }

    animateSprite(): void {
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(this.sprite, this._x, this._y, 30, 30,0,0,20,20)
        ctx.restore;

        // this._x += this.frameSize;
        // this.index += 1;

        // if(this.index >= this.nFrames){
        //     this._x = 0;
        //     this._y = 0;
        //     this.index = 0;
        // }
        
    }
   
}


var mario = new Character(40, 50);

// setup screen elements here
mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");

function gameLoop(){

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

function keyboardInput(event: KeyboardEvent) {

    switch (event.keyCode) {
        case 65: case 37: //a
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.animateSprite();
            mario._x -= 10;
            break;

        case 38: case 87: //w
            mario._y -= 30;
            break;
        case 39: case 68: //d
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.animateSprite()
            mario._x += 10;
            break;
        case 40: case 83: //s
            mario._y += 20;
            break;
        case 32: //space

            break;
        default:
            mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
            mario.drawSprite();
            break;      
    }

}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('canvas');

    document.addEventListener('keydown', keyboardInput)

    ctx = canvas.getContext("2d");
    gameLoop();
}