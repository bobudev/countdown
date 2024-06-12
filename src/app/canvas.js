// Define the Firefly class with properties and methods to simulate fireflies
class Firefly {
  constructor(canvasContext, width, height, settings) {
      this.seed = Math.random() + 0.4;
      this.context = canvasContext;
      this.width = width;
      this.height = height;
      this.x = Math.random() * this.width;
      this.y = Math.random() * this.height;
      this.speed = settings.speed;
      this.size = settings.differentSize ? settings.size * this.seed : settings.size;
      this.color = settings.color;
      this.rgbColor = this.hexToRGB(this.color);
      this.isGradient = settings.isGradient;
      this.fadeSpeedRate = settings.fadeSpeedRate;
      this.randomFadeTime = settings.randomFadeTime;
      this.fadeSpeed = 0;
      this.dx = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
      this.dy = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
  }

  move() {
      this.x += this.speed * Math.sin(this.dx);
      this.y += this.speed * Math.sin(this.dy);
      if (this.x > this.width || this.x < 0) this.dx *= -1;
      if (this.y > this.height || this.y < 0) this.dy *= -1;
  }

  buildGradientStyle(size) {
      let gradient = this.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * size);
      gradient.addColorStop(0, `rgba(${this.rgbColor},1)`);
      gradient.addColorStop(0.1, `rgba(${this.rgbColor},1)`);
      gradient.addColorStop(1, `rgba(${this.rgbColor},1)`);
      return gradient;
  }

  show() {
      let size = this.size * Math.abs(Math.cos(this.fadeSpeed));
      this.context.beginPath();
      this.context.fillRect(this.x, this.y, size, size);
      this.context.closePath();
      this.fadeSpeed += this.fadeSpeedRate * (this.randomFadeTime ? this.seed : 1);
      this.context.fillStyle = this.isGradient ? this.buildGradientStyle(size) : this.color;
      this.context.fill();
      this.context.globalAlpha = 0.5;
  }

  hexToRGB(hex) {
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
  }
}

// Default settings for the fireflies
const defaultSettings = {
  color: "#FFC200",
  size: 8,
  speed: 0.1,
  blur: 0,
  count: 40,
  fadeSpeedRate: 0.01,
  differentSize: true,
  isGradient: true,
  randomFadeTime: true
};

// Initialize the canvas and fireflies
export default function initFireflies(settings = defaultSettings) {
  const canvas = document.getElementById("fireflies-canvas");
  const context = canvas.getContext("2d");
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  let fireflies = [];
  for (let i = 0; i < settings.count; i++) {
      fireflies.push(new Firefly(context, width, height, settings));
  }

  function draw() {
      context.clearRect(0, 0, width, height);
      fireflies.forEach(firefly => {
          firefly.move();
          firefly.show();
      });
      requestAnimationFrame(draw);
  }

  draw();
}
