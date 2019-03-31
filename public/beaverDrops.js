var ctx;
var imgBg;
var imgDrops;
var x = 0;
var y = 0;
var noOfDrops = 50;
var fallingDrops = [];

function drawBackground(width, height) {
  // ctx.drawImage(imgBg, 0, 0); //Background
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.restore();
}

function draw() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  ctx.canvas.width = width;
  ctx.canvas.height = height;
  drawBackground(width, height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (var i = 0; i < noOfDrops; i++) {
    ctx.drawImage(
      fallingDrops[i].image,
      fallingDrops[i].x,
      fallingDrops[i].y,
      50,
      50
    ); //The rain drop

    fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
    if (fallingDrops[i].y > height + 100) {
      //Repeat the raindrop when it falls out of view
      fallingDrops[i].y = -100; //Account for the image size
      fallingDrops[i].x = Math.random() * width; //Make it appear randomly along the width
    }
  }
}

function setup() {
  var canvas = document.getElementById("canvasRegion");
  console.log(canvas);

  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    imgBg = new Image();
    imgBg.src = "metro-was-a-mistake.jpg";
    setInterval(draw, 36);
    for (var i = 0; i < noOfDrops; i++) {
      var fallingDr = new Object();
      fallingDr["image"] = new Image();
      fallingDr.image.src = "Beaver.png";

      fallingDr["x"] = Math.random() * width;
      fallingDr["y"] = Math.random() * height - 100;
      fallingDr["speed"] = 3 + Math.random() * 5;
      fallingDrops.push(fallingDr);
    }
  }
}
