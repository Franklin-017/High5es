const cursor = document.querySelector("#cursor");
const cursorCircle = cursor.querySelector(".cursor__circle");

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener("mousemove", updateCoordinates);

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
  const rotate = "rotate(" + angle + "deg)";
  const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll("[cursor-class]");

cursorModifiers.forEach((curosrModifier) => {
  curosrModifier.addEventListener("mouseenter", function () {
    const className = this.getAttribute("cursor-class");
    cursor.classList.add(className);
  });

  curosrModifier.addEventListener("mouseleave", function () {
    const className = this.getAttribute("cursor-class");
    cursor.classList.remove(className);
  });
});

const opacityZero = "opacity-0";
const transformRight150 = "transform-right-150";
const transformLeft100 = "transform-left-100";
const transformRight100 = "transform-right-100";
const scaleSmall = "scale-small";

window.addEventListener("scroll", () => {
  removeClassNames(
    ["hence-proved-img-wrapper", "gallery-image-wrapper", "our-team-hero-section-wrapper", "email-input-wrapper", "social-media-icons-wrapper"],
    [opacityZero, scaleSmall]
  );
  removeClassNames(
    ["hence-proved-title", "color-title", "color-subtitle", "content-wrapper", "speak-title", "speak-subtitle", "footer-title", "footer-content"],
    [opacityZero, transformRight150]
  );
  removeClassNames(
    [
      "hence-proved-bottom-section",
      "hero-section-main-text",
      "hero-section-subtitle",
      "explore-more-wrapper",
      "black-circle",
      "feels-explore-more-sec",
      "our-team-left-content",
      "speak-us-more-left-content"
    ],
    [opacityZero, transformLeft100]
  );
  removeClassNames(
    ["orange-circle", "feels-section-title", "feels-section-subtitle", "our-team-right-content", "speak-us-more-right-content", "copy-right-content"],
    [opacityZero, transformRight100]
  );
  removeClassNames(["our-team-header-title"], [opacityZero]);
});

const canAnimateElement = (target) => {
  const { scrollTop, clientHeight } = document.documentElement;
  let nodeElement = document.getElementsByClassName(target);
  let nodeElementPosition = nodeElement[0].getBoundingClientRect().top;
  if (scrollTop > (scrollTop + nodeElementPosition).toFixed() - clientHeight * 0.85) {
    return true;
  } else {
    return false;
  }
};

const removeClassNames = (target, classNames, isHeroSection = false) => {
  target.forEach((ele) => {
    let node = document.getElementsByClassName(ele);
    if (isHeroSection || canAnimateElement(ele)) {
      classNames.forEach((cssClass) => {
        for (let i = 0; i < node.length; i++) node[i].classList.remove(cssClass);
      });
    }
  });
};

setTimeout(setHeroSectionAnimation, 200);

function setHeroSectionAnimation() {
  removeClassNames(["hero-section-main-text", "hero-section-subtitle", "explore-more-wrapper"], [opacityZero, transformLeft100], true);
}
