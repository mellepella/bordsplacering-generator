const A4_DIMENSIONS = { width: 2480, height: 3508 };
const TEXT_SIZE = 140;

function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}

document.getElementById("image").onchange = function (e) {
  const img = new Image();
  img.onload = draw;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};

async function draw() {
  const canvas = document.getElementById("canvas");
  canvas.width = this.width;
  canvas.height = this.height;
  console.log(this.width, this.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
  ctx.font = `${TEXT_SIZE}px Rouge Script`;
  ctx.fillText("Melvin W", this.width / 3, (this.height / 4) * 3.2);
}
