import Aspect, { applyAspect } from "./AspectModule.js";

// ********** Initializing Element Variables ************

let body = document.querySelector("body");
let image = document.querySelector("#image");

// --------- End Initializing Element Variables ---------

// ********* Variables initializations ************

// original dimentions of the image file
let originalWidth = image.naturalWidth;
let originalHeight = image.naturalHeight;
Aspect.initial(originalWidth, originalHeight);

// Variables to save all aspects and current aspect to show.
let aspects = []; // to save all aspects that have to be shown
let slide = 0; // index of the aspect in aspects that have to be shown currently

// populate the aspects array
// todo: to not write aspects manually
aspects.push(new Aspect(30, 346, 60, 306));
aspects.push(new Aspect(60, 656, 0, 326));
aspects.push(new Aspect(530, 1106, -20, 306));

// showing first aspect when the presentation starts
applyAspect(aspects[0], image);

// --------- End Variables initializations -------------

function nextSlide() {
  slide = (slide + 1) % aspects.length;
  applyAspect(aspects[slide], image);
}

function previousSlide() {
  if (slide > 0) {
    slide--;
    applyAspect(aspects[slide], image);
  }
}

// go to next slide when clicking on the page
body.addEventListener("click", nextSlide);

// go to next and previous slides by keystrokes in keyboard
document.addEventListener("keydown", keyHandler, false);
function keyHandler(e) {
  let keyCode = e.keyCode;
  switch (keyCode) {
    case 32: // space
    case 13: // enter
    case 39: // right arrow
    case 34: // for slide next button
      nextSlide();
      break;
    case 37: // left arrow
    case 33: // for slide previous button
      previousSlide();
      break;
  }
}

// handling screen size changes (calculating image attrs by new window width and height)
window.onresize = () => applyAspect(aspects[slide], image);
