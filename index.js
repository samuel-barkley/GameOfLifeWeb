"use strict"

let Game = {};
let canvas;
let ctx;
let stopped = false;

let lastRender = 0;

window.onload = init;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", keyPressed, false);
    start();
}

function start() {
    window.requestAnimationFrame(loop)
}

function update(progress) {
    console.log(progress)
}

function draw(ctx) {
    
}

function loop(timestamp) {
    let progress = timestamp - lastRender

    update(progress)
    draw(ctx)

    lastRender = timestamp
    if (!stopped)
        window.requestAnimationFrame(loop)
}

// Handles keypresses.
function keyPressed(e)
{
    switch(e.keyCode)
    {
        case 27:
            stopUpdates()
            break;
    }
}

// Stops the update cycle of the application.
function stopUpdates()
{
    stopped = true;
}