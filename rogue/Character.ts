class Character extends GameItem {

    frameWidth: number;
    frameHeight: number;
    tickCount: number;
    ticksPerFrame: number = 1;
    frameIndex: number;

    constructor(position, public numberOfFrames: number) {
        super(position)
    };

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
}
