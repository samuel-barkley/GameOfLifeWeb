let  gridSizeLocal = []
export function drawGrid(ctx, gridSize) {
    /*
    for (let i = 0; i < gridSize[0]; i++) {
        drawLine(ctx, [100 * i, 0], [100 * i, gridSize[1]*100]);
    }

    for (let j = 0; j < gridSize[1]; j++) {
        drawLine(ctx, [0, 100 * j], [gridSize[0]*100, 100 * j]);
    }

    drawLine(ctx, [gridSize[0] * 100, 0], [gridSize[0] * 100, gridSize[1]*100])
    drawLine(ctx, [0, gridSize[1] * 100], [gridSize[0]*100, gridSize[1] * 100])
    */
    // TODO: grid generation isn't working properly.
    var w = ctx.canvas.width,
        h = ctx.canvas.height;
    //console.log("width: " + w + ", height:" + h)
    gridSizeLocal = [gridSize[0], gridSize[1]]
    ctx.beginPath();
    for (var x = 0; x <= w; x += gridSize[0]) {
        ctx.moveTo(x - 0.5, 0);      // 0.5 offset so that 1px lines are crisp
        ctx.lineTo(x - 0.5, h);
    }
    for (var y = 0; y <= h; y += gridSize[1]) {
        ctx.moveTo(0, y - 0.5);
        ctx.lineTo(w, y - 0.5);
    }
    ctx.stroke();
}

export function drawSquare(ctx, pos, colour = "black") {
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    ctx.fillRect(pos[0] * gridSizeLocal[0], pos[1] * gridSizeLocal[1], gridSizeLocal[0], gridSizeLocal[1]);

    // reset to black.
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
}

export function drawLine(ctx, src, dest) {
    ctx.moveTo(src[0], src[1]);
    ctx.lineTo(dest[0], dest[1]);
    ctx.stroke();
}

export function blank(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}