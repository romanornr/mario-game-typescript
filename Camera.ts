class Camera {

    x: number;
    y: number;
    width: number;
    height: number;

    constructor() { }

    View(): void {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    moveCam(canvas){
		canvas.style.left += 12;
    }
}