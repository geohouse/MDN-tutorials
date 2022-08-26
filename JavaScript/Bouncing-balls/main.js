// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height) {
      //   console.log("exceeded height");
      //   console.log("previous velY");
      //   console.log(this.velY);
      this.velY = -this.velY;
      //   console.log("changed velY");
      //   console.log(this.velY);
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y - this.size <= 0) {
      //   console.log("Hit y index 0");
      //   console.log("previous velY");
      //   console.log(this.velY);
      this.velY = -this.velY;
      //   console.log("changed velY");
      //   console.log(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
          // These make the balls 'bounce' off each other in addition to changing
          // color when they collide.
          this.velY = -1 * this.velY;
          this.velX = -1 * this.velX;
          ball.velY = -1 * ball.velY;
          ball.velX = -1 * ball.velX;
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
  }

  move(event) {
    switch (event.key) {
      // This is how to do 'compound' case statements; activates if
      // e.g. 'a' or 'ArrowLeft' pressed for left
      case "ArrowLeft":
      case "a":
        this.x -= this.velX;
        break;
      case "d":
      case "ArrowRight":
        this.x += this.velX;
        break;
      case "w":
      case "ArrowUp":
        this.y -= this.velY;
        break;
      case "s":
      case "ArrowDown":
        this.y += this.velY;
        break;
    }
  }

  draw() {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = this.x - this.size;
    }
    if (this.y + this.size >= height) {
      this.y = this.y - this.size;
    }
    if (this.x - this.size <= 0) {
      this.x = this.x + this.size;
    }
    if (this.y - this.size <= 0) {
      this.y = this.y + this.size;
    }
  }

  collisionDetect() {
    balls.forEach((ball, index) => {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + ball.size) {
        balls.splice(index, 1);
        document.querySelector(
          "#ball-count"
        ).innerText = `Ball count: ${balls.length}`;
      }
    });
  }
}

const balls = [];

while (balls.length < 150) {
  const size = random(10, 20);
  const ball = new Ball(
    // always draw at least 1 ball width from edge to prevent
    // drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

const evilBallSize = 10;
const evilBall = new EvilCircle(
  random(0 + evilBallSize, width - evilBallSize),
  random(0 + evilBallSize, height - evilBallSize)
);

window.addEventListener("keydown", (event) => {
  evilBall.move(event);
  console.log(event.key);
});

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
      evilBall.draw();
      evilBall.checkBounds();
      evilBall.collisionDetect();
    }
  }
  requestAnimationFrame(loop);
}

loop();
