var w = 512, h = 384;
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
