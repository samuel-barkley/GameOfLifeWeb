"use strict"
import * as d from './drawLib.js';
import { Cell } from './cell.js';

let gameGrid;
let gameObjects = [];
let canvas;
let ctx;
let stopped = false;

let spaceSizes;
let nOfSpaces = [30, 30];

let index = 0;

let secondsPassed;
let oldTimeStamp;
let fps;

let lastRender = 0;

let thingToDraw = [
    `................................`,
    `................................`,
    `................................`,
    `................................`,
    `................................`,
    `................................`,
    `................................`,
    `...ooo.ooo.o...o.o..o.ooo.o.....`,
    `...o...o.o.oo.oo.o..o.o...o.....`,
    `...ooo.ooo.o.o.o.o..o.oo..o.....`,
    `.....o.o.o.o...o.o..o.o...o.....`,
    `...ooo.o.o.o...o.oooo.ooo.ooo...`,
    `................................`,
    `................................`,
    `................................`,
    `................................`,
    `................................`,
    `................................`,
    `................................`,
]

window.onload = init;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", keyPressed, false);
    console.log(thingToDraw.length);
    start();
}

function start() {
    spaceSizes = [Math.floor(window.innerWidth / nOfSpaces[0]), Math.floor(window.innerWidth / nOfSpaces[1])];
    createGrid();
    window.requestAnimationFrame(gameLoop)
}

function createGrid() {
    for (let y = 0; y < nOfSpaces[1]; y++) {
        for (let x = 0; x < nOfSpaces[0]; x++) {
            gameObjects.push(new Cell(ctx, [x, y], isInitAlive([x, y])))
        }
    }

    d.drawGrid(ctx, spaceSizes);
}

function gameLoop(timeStamp) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // Perform the drawing operation
    draw();

    /* Used to get images from the canvas.
    let image = new Image();
    image.src = canvas.toDataURL("image/png");
    let number = document.createElement("p");
    let textNode = document.createTextNode(index);
    number.appendChild(textNode);
    document.body.appendChild(image);
    document.body.appendChild(number);
    index++;*/

    checkSurrounding();
    setTimeout(() => {
        window.requestAnimationFrame(() => gameLoop(timeStamp));
    }, 3000)
}

function draw() {
    d.blank(ctx);
    d.setLocalGridSize(nOfSpaces);
    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].alive) {
            d.drawSquare(ctx, [gameObjects[i].pos[0], gameObjects[i].pos[1]], "red");
        }
    }
    //d.drawGrid(ctx, nOfSpaces)
}

function checkSurrounding() {
    // Loop over all cells
    for (let x = 0; x < nOfSpaces[0]; x++) {
        for (let y = 0; y < nOfSpaces[1]; y++) {
            // Count the nearby population
            let numAlive = isAlive(x - 1, y - 1) + isAlive(x, y - 1) + isAlive(x + 1, y - 1) + isAlive(x - 1, y) + isAlive(x + 1, y) + isAlive(x - 1, y + 1) + isAlive(x, y + 1) + isAlive(x + 1, y + 1);
            let centerIndex = gridToIndex(x, y);

            if (numAlive == 2) {
                // Do nothing
            } else if (numAlive == 3) {
                // Make alive
                gameObjects[centerIndex].nextAlive = true;
            } else {
                // Make dead
                gameObjects[centerIndex].nextAlive = false;
            }
        }
    }

    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].alive = gameObjects[i].nextAlive;
    }
}

function isAlive(x, y) {
    if (x < 0 || x >= nOfSpaces[0] || y < 0 || y >= nOfSpaces[1]) {
        return false;
    }
    return gameObjects[gridToIndex(x, y)].alive ? 1 : 0;
}

function gridToIndex(x, y) {
    return x + (y * nOfSpaces[0]);
}

// Handles keypresses.
function keyPressed(e) {
    switch (e.keyCode) {
        case 27:
            stopUpdates()
            break;
    }
}

// Stops the update cycle of the application.
function stopUpdates() {
    stopped = true;
}

function isInitAlive(pos) {
    if (pos[1] < thingToDraw.length)
    {
        if (pos[0] < thingToDraw[pos[1]].length)
        {
            switch (thingToDraw[pos[1]].charAt(pos[0])) {
                case '.':
                    return false;
                    break;
                case 'o':
                    return true;
                    break;
            }
        }
    }
    
    return false;
}