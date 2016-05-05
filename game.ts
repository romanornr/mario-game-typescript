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

function keyboardInput(event: KeyboardEvent){
    //a
    if(event.keyCode == 37 || event.keyCode == 65){
        window.alert("left key is pressed");
    }
    //w
    else if (event.keyCode == 38 || event.keyCode == 87){
        window.alert("Up key is pressed");
    }
    //d
    else if (event.keyCode == 39 || event.keyCode == 68){
        window.alert("right key is pressed");
    }
    //s
    else if(event.keyCode == 40 || event.keyCode == 83){
        window.alert("down key is pressed");
    }
    //space
    else if (event.keyCode == 32){
        window.alert("space key is pressed")
    }
}

window.onload = () => {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");

    document.addEventListener('keydown', keyboardInput)

    var ctx = canvas.getContext("2d");
    gameLoop(ctx);
}