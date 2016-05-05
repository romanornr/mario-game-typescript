var w = 720, h = 480;
var Mario = (function () {
    function Mario(x, y) {
        var _this = this;
        this.downForce = 3;
        this.drawImage = function (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.drawImage(marioImage, _this.x, _this.y);
            ctx.restore;
        };
        this.x = x;
        this.y = y;
    }
    return Mario;
}());
var marioImage = new Image();
marioImage.src = "graphics/mario/small/Standing-mario.gif";
var mario1 = new Mario(70, 45);
function gameLoop(ctx) {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "rgb(174,238,238)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgb(14,253,1)";
    var floor = ctx.fillRect(0, h - 45, w, 45);
    mario1.drawImage(ctx);
    //ctx.clearRect(0, 0, w, h);
}
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    gameLoop(ctx);
};
