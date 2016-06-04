class Vector {

	frameWidth: number;
	frameHeight: number;
	height: number;

    constructor(public x: number, public y: number) { }

    setWidth(frameWidth: number) {
		this.frameWidth = frameWidth;
    }

    getHeight(frameHeigth: number){
		this.frameHeight = frameHeigth;
    }

    public xDimension() : number {
		  return this.x + this.frameWidth
    }

    public yDimension() : number {
      return this.y + this.frameHeight
    }

    magnitude = (): number => {
		 return Math.sqrt(this.xDimension() * this.xDimension() + this.yDimension() * this.yDimension());
     }

     normalize = (): number => {
        var len: number = Math.sqrt(this.xDimension() * this.xDimension() + this.yDimension() * this.yDimension());
        this.x = (this.x + this.frameWidth) / len;
        this.y = (this.x + this.frameHeight) / len;
        return;
     }

}

