var w = 512, h = 384;
var Mario = (function () {
    function Mario(velocity, heigth) {
        this.velocity = velocity;
        this.heigth = heigth;
        this.discription = velocity + " this is is height: " + heigth;
    }
    return Mario;
}());
function intro(mario) {
    return "This is Mario and " + mario.velocity + " " + mario.heigth;
}
var player = new Mario(1, 1.50);
console.log(intro(player));
function gameLoop(ctx) {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    ctx.fillRect(0, h - 45, w, 45);
}
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    gameLoop(ctx);
};
