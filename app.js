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

ScrollReveal().reveal(".hero-section-subtitle, .hero-section-main-text, .explore-more-text", {
  mobile: true,
  delay: 300,
  origin: "left",
  distance: "40px",
  duration: 1500,
  reset: true
});
ScrollReveal().reveal(".title, .subtitle, .footer-title", {
  reset: true,
  mobile: true,
  delay: 100,
  duration: 1000,
  origin: "right",
  distance: "40px",
  duration: 2000
});
ScrollReveal().reveal(
  ".hence-proved-bottom-section, .content-wrapper, .our-team-text-content.text-right, .our-team-content-title, .speak-us-more-left-content, .img-1-bg",
  { reset: true, mobile: true, delay: 200, duration: 1500, origin: "left", distance: "40px" }
);
ScrollReveal().reveal(".content-wrapper, .our-team-text-content.text-left, .speak-us-more-right-content, .footer-content, .img-3-bg, .copy-right-content", {
  reset: true,
  mobile: true,
  delay: 200,
  duration: 1500,
  origin: "right",
  distance: "40px"
});
ScrollReveal().reveal(".our-team-rectangle-frame, .our-team-header-number, .hence-proved-img", {
  mobile: true,
  delay: 100,
  duration: 2500,
  reset: true,
  scale: 0.7
});
ScrollReveal().reveal(".our-team-hero-section-wrapper", { mobile: true, delay: 100, duration: 2500, reset: true, scale: 0.6 });
ScrollReveal().reveal(".our-team-man-image", { mobile: true, delay: 200, duration: 2500, reset: true, scale: 1.5 });
ScrollReveal().reveal(".gallery-img, .white-bg, .artist-details, .vertical-line", { delay: 100, duration: 2500, reset: true, scale: 0.5 });
ScrollReveal().reveal(".black-circle, .orange-circle, .email-input-wrapper", {
  delay: 100,
  duration: 2500,
  reset: true,
  scale: 0.7,
  distance: "40px",
  origin: "left"
});
ScrollReveal().reveal(".orange-circle", { origin: "right" });
ScrollReveal().reveal(".social-media-icons-wrapper", { reset: true, opacity: 0, delay: 200, duration: 1500, scale: 0.2 });
