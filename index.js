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

let secondsPassed;
let oldTimeStamp;
let fps;

let lastRender = 0;

window.onload = init;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", keyPressed, false);
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
            gameObjects.push(new Cell(ctx, [x, y]))
        }
    }
    d.drawGrid(ctx, spaceSizes);
}

function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    checkSurrounding();

    // Perform the drawing operation
    draw();

    // The loop function has reached it's end, keep requesting new frames
    //setTimeout(() => {
        window.requestAnimationFrame(() => gameLoop(timeStamp));
    //}, 100) // The delay will make the game easier to follow
}

function draw() {
    d.blank(ctx);

    for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].alive) {
            d.drawSquare(ctx, [gameObjects[i].pos[0], gameObjects[i].pos[1]], "red");
        }
        else {
            //d.drawSquare(ctx, [gameObjects[i].pos[0], gameObjects[i].pos[1]], "black");
        }
    }
    d.drawGrid(ctx, nOfSpaces)
    // drawFPS();
}

function drawFPS() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 120, 50);
    ctx.font = '25px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("FPS: " + fps, 10, 30);
}

function checkSurrounding() {
    // Loop over all cells
    for (let x = 0; x < nOfSpaces[0]; x++) {
        for (let y = 0; y < nOfSpaces[1]; y++) {
            // Count the nearby population
            let numAlive = isAlive(x - 1, y - 1) + isAlive(x, y - 1) + isAlive(x + 1, y - 1) + isAlive(x - 1, y) + isAlive(x + 1, y) + isAlive(x - 1, y + 1) + isAlive(x, y + 1) + isAlive(x + 1, y + 1);
            
        }
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