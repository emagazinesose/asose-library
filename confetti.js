const NUM_CONFETTI = 350;
const COLORS = [
  [85, 71, 106],
  [174, 61, 99],
  [248, 182, 70],
];
const PI_2 = 2 * Math.PI;

const canvas = document.getElementById("world");
const context = canvas.getContext("2d");
let w = 0,
  h = 0;

const resizeWindow = () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
};

window.addEventListener("resize", resizeWindow, false);
window.onload = () => setTimeout(resizeWindow, 0);

const range = (a, b) => (b - a) * Math.random() + a;

const drawCircle = (x, y, r, style) => {
  context.beginPath();
  context.arc(x, y, r, 0, PI_2, false);
  context.fillStyle = style;
  context.fill();
};

let xpos = 0.5;

document.onmousemove = (e) => {
  xpos = e.pageX / w;
};

class Confetti {
  constructor() {
    this.style = COLORS[~~range(0, COLORS.length)];
    this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
    this.r = ~~range(2, 6);
    this.r2 = 2 * this.r;
    this.replace();
    this.visible = true; // Initially, the confetti is visible
  }

  replace() {
    this.opacity = 0;
    this.dop = 0.03 * range(1, 4);
    this.x = range(-this.r2, w - this.r2);
    this.y = range(-20, h - this.r2);
    this.xmax = w - this.r;
    this.ymax = h - this.r;
    this.vx = range(0, 2) + 8 * xpos - 5;
    this.vy = 0.7 * this.r + range(-1, 1);
  }

  draw() {
    if (!this.visible) return; // If confetti is not visible, don't draw it

    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;

    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop *= -1;
    }

    if (this.opacity < 0 || this.y > this.ymax) {
      this.replace();
    }

    if (!(0 < this.x && this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }

    drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
  }
}

const confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());

// Duration of the animation in milliseconds (e.g., 5 seconds)
const animationTime = 7000;
const stopTime = Date.now() + animationTime; // Calculate the stop time

const step = () => {
  const remainingTime = stopTime - Date.now();

  if (remainingTime <= 0) {
    // Stop the confetti animation by hiding the confetti
    confetti.forEach((c) => {
      c.visible = false; // Hide confetti after the stop time
    });
  }

  requestAnimationFrame(step);
  context.clearRect(0, 0, w, h);
  confetti.forEach((c) => c.draw());
};

step();
