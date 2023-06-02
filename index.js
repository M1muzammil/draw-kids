const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let color = '';
let lineWidth = 5;
let preX = null;
let preY = null;
let isDrawing = false;

body.style.background = "#FFFFFF";

var input = document.getElementById("favcolor");
input.addEventListener("input", function() {
  color = input.value;
  body.style.background = color;
}, false);

const ctx = canvas.getContext("2d");
ctx.lineWidth = lineWidth;

document.getElementById("ageinput").addEventListener("input", function() {
  isDrawing = false;
  lineWidth = this.value;
  document.getElementById("ageOutput").innerHTML = lineWidth;
  ctx.lineWidth = lineWidth;
});

document.querySelectorAll(".clr").forEach(clr => {
  clr.addEventListener("click", function() {
    ctx.strokeStyle = this.dataset.clr;
  });
});

document.querySelector(".clear").addEventListener("click", function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.querySelector(".save").addEventListener("click", function() {
  let data = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});

canvas.addEventListener("mousedown", function() {
  isDrawing = true;
});

canvas.addEventListener("mouseup", function() {
  isDrawing = false;
});

canvas.addEventListener("mousemove", function(e) {
  if (preX === null || preY === null || !isDrawing) {
    preX = e.clientX;
    preY = e.clientY;
    return;
  }

  let currentX = e.clientX;
  let currentY = e.clientY;

  ctx.beginPath();
  ctx.moveTo(preX, preY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  preX = currentX;
  preY = currentY;
});

canvas.addEventListener("mouseleave", function() {
  isDrawing = false;
});
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);