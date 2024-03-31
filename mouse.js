// get references to the canvas and context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let aspectText = document.getElementById("aspect-text");

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
let canvasOffset = canvas.getBoundingClientRect();
let offsetX = canvasOffset.left;
let offsetY = canvasOffset.top;

// this flag is true when the user is dragging the mouse
let isDown = false;

// these vars will hold the starting mouse position
let startX;
let endX;
let startY;
let endY;

function drawRect(startX, startY, width, height) {
    // style the context
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';

    ctx.strokeRect(startX, startY, width, height);
}

function updateSpan(X1, Y1, X2, Y2, width, height) {
    aspectText.innerHTML = ""

    if (Y2 > Y1)
        aspectText.innerHTML += `(${X1}, ${Y1}) (${X2}, ${Y2}) [${width}x${height}]`;
    else
        aspectText.innerHTML += `(${X2}, ${Y2}) (${X1}, ${Y1}) [${-width}x${-height}]`;
}

function handleMouseDown(e) {
    // console.log('handleMouseDown')
    // console.log(e)
    e.preventDefault();
    e.stopPropagation();

    // save the starting x/y of the rectangle
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // set a flag indicating the drag has begun
    isDown = true;

    ctx.drawImage(background, canvasPadding, canvasPadding, background.width, background.height);
}

function handleMouseUp(e) {
    // console.log('handleMouseUp')
    // console.log(e)
    e.preventDefault();
    e.stopPropagation();

    // save the starting x/y of the rectangle
    endX = parseInt(e.clientX - offsetX);
    endY = parseInt(e.clientY - offsetY);

    console.log(`(${Math.round(endX * (1 / canvasScale) - canvasPadding)}, ${Math.round(endY * (1 / canvasScale) - canvasPadding)}) (${Math.round(startX * (1 / canvasScale) - canvasPadding)}, ${Math.round(startY * (1 / canvasScale) - canvasPadding)})`);

    // the drag is over, clear the dragging flag
    isDown = false;
}

function handleMouseOut(e) {
    // console.log('handleMouseOut')
    // console.log(e)
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;

    init();
}

function handleMouseMove(e) {
    // console.log('handleMouseMove')
    // console.log(e)
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!isDown) {
        return;
    }

    // get the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update background
    ctx.drawImage(background, canvasPadding, canvasPadding, background.width, background.height);

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    let width = mouseX - startX;
    let height = mouseY - startY;

    // draw a new rect from the start position
    // to the current mouse position
    updateSpan(startX, startY, mouseX, mouseY, width, height);
    drawRect(startX, startY, width, height);
    init();
}

function updateRectZoom(addWidth, addHeight) {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update background
    ctx.drawImage(background, canvasPadding, canvasPadding, background.width, background.height);

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    endX += addWidth / 2;
    endY += addHeight / 2;
    startX -= addWidth / 2;
    startY -= addHeight / 2;

    let width = endX - startX;
    let height = endY - startY;

    // draw a new rect from the start position
    // to the current mouse position
    drawRect(startX, startY, width, height);

    init();
}

function updateRectMove(addWidth, addHeight) {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update background
    ctx.drawImage(background, canvasPadding, canvasPadding, background.width, background.height);

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    endX += addWidth / 2;
    startX += addWidth / 2;

    endY += addHeight / 2;
    startY += addHeight / 2;

    let width = endX - startX;
    let height = endY - startY;

    // draw a new rect from the start position
    // to the current mouse position
    drawRect(startX, startY, width, height);

    init();
}

document.getElementById('canvas').addEventListener('mousedown', function (e) {
    handleMouseDown(e);
});
document.getElementById('canvas').addEventListener('mousemove', function (e) {
    handleMouseMove(e);
});
document.getElementById('canvas').addEventListener('mouseup', function (e) {
    handleMouseUp(e);
});
document.getElementById('canvas').addEventListener('mouseout', function (e) {
    handleMouseOut(e);
});

