var w = 720, h = 480;

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D; 

interface Character{
    draw(): void;
    velocity: number;
    downForce: number;
    x: number;
    y: number;
}

class Mario {
    public x: number;
    public y: number;
    public downForce: number = 3;
  
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public drawImage = (): void =>{
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(marioImage, this.x, this.y);
        ctx.restore;
    }

}

var marioImage = new Image();
marioImage.src = "graphics/mario/small/Standing-mario.gif";

var mario: Mario = new Mario(70, 45);

function gameLoop(){
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario.drawImage();
}

function keyboardInput(event: KeyboardEvent){
    //a
    if(event.keyCode == 37 || event.keyCode == 65){
        mario.x -= 10;
    }
    //w
    else if (event.keyCode == 38 || event.keyCode == 87){
        mario.y -= 35;
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