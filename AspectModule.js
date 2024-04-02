class Aspect {
  static originalWidth = 20;
  static originalHeight = 20;
  static initial(originalWidth, originalHeight) {
    console.log("initial", originalWidth, originalHeight);
    Aspect.originalWidth = originalWidth;
    Aspect.originalHeight = originalHeight;
  }

  constructor(l, r, t, b) {
    if (!Aspect.originalWidth || !Aspect.originalHeight) {
      console.log(Aspect.originalWidth, Aspect.originalHeight);
      throw "Aspect class must be initilized by initial() function before any instantiation";
    }

    this.l = l;
    this.r = r;
    this.t = t;
    this.b = b;
  }
}

function applyAspect(aspect, image, aspectText) {
  var l = aspect.l;
  var r = aspect.r;
  var t = aspect.t;
  var b = aspect.b;
  var aspWidth = r - l;
  var aspHeight = b - t;
  var sceneWidth = window.innerWidth;
  var sceneHeight = window.innerHeight;

  var slideWidth = 0;
  var slideHeight = 0;
  var slideTop = 0;
  var slideLeft = 0;

  var hrTop = 0;
  var hrBottom = sceneHeight - 1;
  var vrLeft = 0;
  var vrRight = sceneWidth - 1;
  var scale = 0;
  if (aspWidth / sceneWidth > aspHeight / sceneHeight) {
    // w is larger
    scale = sceneWidth / aspWidth;
    slideWidth = Aspect.originalWidth * scale;
    slideHeight = Aspect.originalHeight * scale;
    slideLeft = -l * scale;

    let B = t * scale;
    let C = (sceneHeight - aspHeight * scale) / 2;
    let A = B - C;
    slideTop = -A;
    image.style.top = slideTop.toString() + "px";

    hrTop = C;
    hrBottom = C + aspHeight * scale;
  } else {
    scale = sceneHeight / aspHeight;
    slideWidth = Aspect.originalWidth * scale;
    slideHeight = Aspect.originalHeight * scale;
    slideTop = -t * scale;

    var y = l * scale;
    var z = (sceneWidth - aspWidth * scale) / 2;
    var x = y - z;
    slideLeft = -x;

    vrLeft = z;
    vrRight = z + aspWidth * scale;
  }

  image.style.width = slideWidth.toString() + "px";
  image.style.left = slideLeft.toString() + "px";
  image.style.height = slideHeight.toString() + "px";
  image.style.top = slideTop.toString() + "px";
  image.getBoundingClientRect().top;

  document.getElementById("hrtop").style.top = hrTop.toString() + "px";
  document.getElementById("hrbottom").style.top = hrBottom.toString() + "px";
  document.getElementById("vrleft").style.left = vrLeft.toString() + "px";
  document.getElementById("vrright").style.left = vrRight.toString() + "px";

  aspectText.innerHTML = "";
  aspectText.innerHTML +=
    "L: " +
    aspect.l +
    ", R: " +
    aspect.r +
    ", T: " +
    aspect.t +
    ", B:" +
    aspect.b;
}

function hzoomin(aspect, image, aspectText) {
  aspect.l += 10;
  aspect.r -= 10;
  applyAspect(aspect, image, aspectText);
}

function vzoomin(aspect, image, aspectText) {
  aspect.t += 10;
  aspect.b -= 10;
  applyAspect(aspect, image, aspectText);
}

function hzoomout(aspect, image, aspectText) {
  aspect.l -= 10;
  aspect.r += 10;
  applyAspect(aspect, image, aspectText);
}

function vzoomout(aspect, image, aspectText) {
  aspect.t -= 10;
  aspect.b += 10;
  applyAspect(aspect, image, aspectText);
}

function rightMove(aspect, image, aspectText) {
  aspect.l -= 10;
  aspect.r -= 10;
  applyAspect(aspect, image, aspectText);
}

function leftMove(aspect, image, aspectText) {
  aspect.l += 10;
  aspect.r += 10;
  applyAspect(aspect, image, aspectText);
}

function topMove(aspect, image, aspectText) {
  aspect.t += 10;
  aspect.b += 10;
  applyAspect(aspect, image, aspectText);
}

function bottomMove(aspect, image, aspectText) {
  aspect.t -= 10;
  aspect.b -= 10;
  applyAspect(aspect, image, aspectText);
}

export default Aspect;
export {
  applyAspect,
  hzoomin,
  hzoomout,
  vzoomin,
  vzoomout,
  rightMove,
  leftMove,
  topMove,
  bottomMove,
};
