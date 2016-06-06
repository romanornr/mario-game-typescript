class GameItem {

    frameWidth: number;
    frameHeight: number;
    COLLIDER: RectangleCollider;

    constructor(public position : Vector) {}

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
        return new RectangleCollider(this.position);
    }
}
