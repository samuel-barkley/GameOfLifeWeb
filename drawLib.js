let gridSizeLocal = []
export function drawGrid(ctx, gridSize) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height;

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

export function setLocalGridSize(gridSize) {
    gridSizeLocal = [gridSize[0], gridSize[1]];
}