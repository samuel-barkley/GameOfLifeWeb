export function drawGrid(ctx, gridSize) {
    for (let i = 0; i < gridSize[0]; i++) {
        drawLine(ctx, [100 * i, 0], [100 * i, 1000]);
    }

    for (let j = 0; j < gridSize[1]; j++) {
        drawLine(ctx, [0, 100 * j], [1000, 100 * j]);
    }

    drawLine(ctx, [gridSize[0] * 100, 0], [gridSize[0] * 100, 1000])
    drawLine(ctx, [0, gridSize[1] * 100], [1000, gridSize[1] * 100])
}

export function drawSquare(ctx, pos, colour = "black") {
    if (colour == "black") {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.fillRect(pos[0] * 100, pos[1] * 100, 100, 100);
    }
    else if (colour == "red") {
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.fillRect(pos[0] * 100, pos[1] * 100, 100, 100);
    }
    else if (colour == "grey") {
        ctx.strokeStyle = "grey";
        ctx.fillStyle = "grey";
        ctx.fillRect(pos[0] * 100, pos[1] * 100, 100, 100);
    }

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