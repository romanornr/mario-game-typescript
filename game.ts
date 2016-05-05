var w = 720, h = 480;

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
    public drawImage = (ctx): void =>{
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(marioImage, this.x, this.y);
        ctx.restore;
    }

}

var marioImage = new Image();
marioImage.src = "graphics/mario/small/Standing-mario.gif";

var mario1: Mario = new Mario(70, 45);

function gameLoop(ctx){
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario1.drawImage(ctx);
    //ctx.clearRect(0, 0, w, h);
}


window.onload = () => {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    gameLoop(ctx);
}