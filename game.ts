var w = 720, h = 480;

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D; 
var downForce = 2;
var gravitySpeed = 1.3;

interface Character{
    x: number;
    y: number;
}

class Mario implements Character{
    public x: number;
    public y: number;
  
    constructor(x: number = 70, y: number = 45) {
        this.x = x;
        this.y = y;
    }
    public drawImage = (): void =>{
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(marioImage, this.x, this.y);
        ctx.restore;
    }

    public gravity = (): void => {
        mario.y += downForce;
            if (mario.y >= 415)
                mario.y = 415;
     };

}

var marioImage = new Image();
marioImage.src = "graphics/mario/small/Standing-mario.gif";

var mario: Mario = new Mario(this.x, this.y);

function gameLoop(){
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario.drawImage();
    mario.gravity();

}

function keyboardInput(event: KeyboardEvent){
    //a
    if(event.keyCode == 37 || event.keyCode == 65){
        mario.x -= 10;
    }
    //w
    else if (event.keyCode == 38 || event.keyCode == 87){
        mario.y -= 30;
    }
    //d
    else if (event.keyCode == 39 || event.keyCode == 68){
        mario.x += 10;
    }
    //s
    else if(event.keyCode == 40 || event.keyCode == 83){
        mario.y += 10;
    }
    //space
    else if (event.keyCode == 32){
        
    }
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('canvas');

    document.addEventListener('keydown', keyboardInput)

    ctx = canvas.getContext("2d");
    gameLoop();
}