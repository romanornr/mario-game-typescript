var w = 512, h = 384;

interface Character{
    discription: string;
    velocity: number;
    heigth: number;
}

class Mario {
    discription: string;
    constructor(public velocity, public heigth){
        this.discription = velocity + " this is is height: " + heigth;
    }
}

function intro(mario : Mario){
    return "This is Mario and " + mario.velocity + " " + mario.heigth;
}

var player = new Mario(1, 1.50);

console.log(intro(player));

function gameLoop(ctx){
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    ctx.fillRect(0, h - 45, w, 45); 
}

window.onload = () => {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    gameLoop(ctx);
}