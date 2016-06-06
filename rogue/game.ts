var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D; 
var downForce = 2;
var gravitySpeed = 1.3;
var view = new Camera();
var canvas = <HTMLCanvasElement>document.createElement('canvas');
view.x = 0;
view.y = 0;
view.width = canvas.width = 720;
view.height = canvas.height = 480;

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
}

var mario = new Character(new Vector(40,50), 4);

var pipe = new GameItem(new Vector(50, 415))
pipe.setSpriteUrl("graphics/assorted/Pipe-head.gif");

mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
mario.numberOfFrames = 1;

enum COLLIDER {
    RECTANGLE,
    CIRCLE,
    POLYGON,
    COMPOUND
}

enum TYPES {
    CHARACTER,
    GAMEITEM,
}

interface iCollider {
    colliderType: COLLIDER;
    position: Vector;
}

class RectangleCollider implements iCollider {
    public colliderType: COLLIDER = COLLIDER.RECTANGLE;
    
    constructor(public position: Vector){}

    public hit(obj: iCollider) : boolean {
        if (obj.colliderType == COLLIDER.RECTANGLE ){
            return Collision.RectangleCollision(this, <RectangleCollider>obj)
        }
        return false; 
    }
    public ColliderType: COLLIDER = COLLIDER.RECTANGLE;
}

class Collision {

    public static RectangleCollision(a: RectangleCollider, b: RectangleCollider): boolean {
        
        var xoverlap: boolean = false;
        var yoverlap: boolean = false;
        console.log(a.position.x)
        if (a.position.x <= b.position.x) {
            if (a.position.x + a.position.xDimension() >= b.position.x) {
                xoverlap = true;
            }
        }
        else {
            if (b.position.x + b.position.xDimension() >= a.position.x) {
                xoverlap = true;
            }
        }

        if (a.position.y <= b.position.y) {
            if (a.position.y + a.position.yDimension() >= b.position.y) {
                yoverlap = true;
            }
        }
        else {
            if (b.position.y + b.position.yDimension() >= a.position.y) {
                yoverlap = true;
            }
        }

        if (xoverlap == true && yoverlap == true) {
            console.log('col');
            return true;
        }

        return false;
    }

}

function gameLoop() {

    ctx.clearRect(0, 0, view.width, view.height);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, view.width, view.height);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, view.height - 45, view.width, 45);
    mario.drawSprite();
    pipe.drawSprite();
    mario.addGravity();
    mario.collide();
    pipe.collide();
    requestAnimationFrame(gameLoop);
    if (Collision.RectangleCollision(mario.collide(), pipe.collide()) )
    {
        console.log('rekt');
    }

}

function keyboardInput(event: KeyboardEvent) {

    switch (event.keyCode) {
        case 65: case 37: //a
            mario.setSpriteUrl("graphics/mario/small/Running-mario-left.gif");
            mario.numberOfFrames = 4;
            mario.position.x -= 10;
            break;

        case 38: case 87: //w
            mario.numberOfFrames = 1;
            mario.setSpriteUrl("graphics/mario/small/Jumping-mario.gif");
            if(mario.position.y < 415) {
                return false;
            }
            mario.position.y -= 30;
            break;
        case 39: case 68: //d
            mario.setSpriteUrl("graphics/mario/small/Running-mario.gif");
            mario.numberOfFrames = 4;
            mario.position.x += 10;
            break;
        case 40: case 83: //s
            mario.position.y += 20;
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
            break;
        case 39: case 68: //d
        case 40: case 83: //s
            mario.setSpriteUrl("graphics/mario/small/Standing-mario.gif");
            mario.numberOfFrames = 1;
            break;
    }
}

window.onload = () => {
    
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

    document.addEventListener('keydown', keyboardInput);
    document.addEventListener('keyup', keyboardInput_release)

    gameLoop();
}