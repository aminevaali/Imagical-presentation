import Aspect, {
  applyAspect,
  hzoomin,
  hzoomout,
  vzoomin,
  vzoomout,
  rightMove,
  leftMove,
  topMove,
  bottomMove,
} from "./AspectModule.js";

// ********** Initializing Element Variables ************

let image = document.querySelector("#image");
let hzoominButton = document.querySelector("#hzoomin"); // horizontal zoomin button
let hzoomoutButton = document.querySelector("#hzoomout"); // horizontal zoomout button
let vzoominButton = document.querySelector("#vzoomin"); // vertical zoomin button
let vzoomoutButton = document.querySelector("#vzoomout"); // vertical zoomout button
let rightMoveButton = document.querySelector("#rightMove");
let leftMoveButton = document.querySelector("#leftMove");
let topMoveButton = document.querySelector("#topMove");
let bottomMoveButton = document.querySelector("#bottomMove");
let aspectText = document.getElementById("aspect-text");

// --------- End Initializing Element Variables ---------

// ********* Variables initializations ************

// original dimentions of the image file
let originalWidth = image.naturalWidth;
let originalHeight = image.naturalHeight;
Aspect.initial(originalWidth, originalHeight);

// initializing default aspect to show whole image at first
var aspect = new Aspect(0, originalWidth, 0, originalHeight);
applyAspect(aspect, image, aspectText);

// --------- End Variables initializations -------------

// ********* Toolbar buttons click handler initialization *********
hzoominButton.addEventListener("click", () =>
  hzoomin(aspect, image, aspectText)
);
hzoomoutButton.addEventListener("click", () =>
  hzoomout(aspect, image, aspectText)
);
vzoominButton.addEventListener("click", () =>
  vzoomin(aspect, image, aspectText)
);
vzoomoutButton.addEventListener("click", () =>
  vzoomout(aspect, image, aspectText)
);
rightMoveButton.addEventListener("click", () =>
  rightMove(aspect, image, aspectText)
);
leftMoveButton.addEventListener("click", () =>
  leftMove(aspect, image, aspectText)
);
topMoveButton.addEventListener("click", () =>
  topMove(aspect, image, aspectText)
);
bottomMoveButton.addEventListener("click", () =>
  bottomMove(aspect, image, aspectText)
);
// --------- End Toolbar buttons click handler initialization ---------


// handling screen size changes (calculating by new window width and height)
window.onresize = () => applyAspect(aspect, image, aspectText);
