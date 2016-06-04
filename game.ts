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
}

class CameraView {

    xView: number;
    yView: number;

    setCamera() {
        this.xView = 0;
        this.yView = 0;
    }
}

class GameItem {

    frameWidth: number;
    frameHeight: number; 

    constructor(public position: Vector) {
    }

    sprite: HTMLImageElement;


    setSpriteUrl(input: string): void {
        this.sprite = new Image();
        this.sprite.src = input;
    }

    addGravity(): void {

        this.position.y += downForce;
        if (this.position.y >= 415)
            this.position.y = 415;
    }

    drawSprite(): void {

        this.frameHeight = this.sprite.height;
        this.frameWidth = this.sprite.width;

        ctx.drawImage(this.sprite, this.position.x, this.position.y);
    }

        collide(): any {
            return this.position;
    }

}


class Character {

    frameWidth: number;
    frameHeight: number; 
    tickCount: number;
    ticksPerFrame: number = 1;
    frameIndex: number;
    jump: boolean;

    constructor(public position: Vector, public numberOfFrames : number) {}

    sprite: HTMLImageElement;


    setSpriteUrl(input: string) : void {
        this.sprite = new Image();
        this.sprite.src = input;
    }

    addGravity(): void {

        this.position.y += downForce;
        if (this.position.y >= 415)
            this.position.y = 415;
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

        this.position.setWidth(this.frameWidth);
        this.position.getHeight(this.frameHeight);
        ctx.drawImage(this.sprite,
            this.frameIndex * this.frameWidth, 0,   // Start of slice
            this.frameWidth, this.frameHeight, // Size of slice
            this.position.x, this.position.y, 15, 20);
    }

    collide(): any {
        this.position
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
    // type: TYPES;
}

class RectangleCollider implements iCollider {
    public dimension: Vector = new Vector(1, 1);
    public colliderType: COLLIDER = COLLIDER.RECTANGLE;
    

    constructor(public position: Vector){}
    // private coord: Array<Vector>;
    // constructor(public position: Vector, private witdh: number, private height: number){
    //     this.coord.push(position);

    //     let x2 = position.x + witdh;
    //     let y2 = position.y;

    //     this.coord.push(new Vector(x2, y2));

    //     let x3 = position.x + witdh;
    //     let y3 = position.y - height;

    //     this.coord.push(new Vector(x3, y3));

    //     let x4 = position.x;
    //     let y4 = position.y -  height;

    //     this.coord.push(new Vector(x4, y4));
    // }
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
        console.log(a)
        if (a.position.x <= b.position.x) {
            if (a.position.x + a.dimension.xDimension() >= b.position.x) {
                xoverlap = true;
            }
        }
        else {
            if (b.position.x + b.dimension.xDimension() >= a.position.x) {
                xoverlap = true;
            }
        }

        if (a.position.y <= b.position.y) {
            if (a.position.y + a.dimension.yDimension() >= b.position.y) {
                yoverlap = true;
            }
        }
        else {
            if (b.position.y + b.dimension.yDimension() >= a.position.y) {
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

    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario.drawSprite();
    pipe.drawSprite();
    mario.addGravity();
    mario.collide();
    pipe.collide();

    if (Collision.RectangleCollision(mario.collide(), pipe.collide())) {
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
    canvas = <HTMLCanvasElement>document.getElementById('canvas');

    document.addEventListener('keydown', keyboardInput);
    document.addEventListener('keyup', keyboardInput_release)

    ctx = canvas.getContext("2d");
    gameLoop();
}