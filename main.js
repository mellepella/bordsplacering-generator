const A4_DIMENSIONS = { width: 2480, height: 3508 };
const TEXT_SIZE = 140;

function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}

document.getElementById("image").onchange = function (e) {
  const img = new Image();
  img.onload = createAllTiles;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};

function createTile(image, text) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.font = `${TEXT_SIZE}px Rouge Script`;
  ctx.fillText(text, image.width / 3, (image.height / 4) * 3.2);

  return canvas;
}

function createA4(tiles, name) {
  const canvas = document.createElement("canvas");
  const newCanvas = document.createElement("canvas");
  newCanvas.width = 100;
  newCanvas.height = 100;
  const ctx_test = newCanvas.getContext("2d");
  ctx_test.fillRect(10, 10, 100, 100);
  canvas.width = A4_DIMENSIONS.width;
  canvas.height = A4_DIMENSIONS.height;
  const ctx = canvas.getContext("2d");
  let currentRow = 0;
  tiles.forEach((tileRow) => {
    let currentColumn = 0;

    tileRow.forEach((tile) => {
      const x = tile.width * currentColumn;
      const y = tile.height * currentRow;
      ctx.drawImage(tile, x, y);
      currentColumn++;
    });
    currentRow++;
  });

  download(name, canvas.toDataURL());
}

function createAllTiles() {
  const { width, height } = createTile(this, "test");
  const tilesPerWidth = Math.floor(A4_DIMENSIONS.width / width);
  const tilesPerHeight = Math.floor(A4_DIMENSIONS.height / height);
  const numberOfA4Needed = Math.ceil(
    input.length / (tilesPerHeight * tilesPerWidth)
  );
  console.log(numberOfA4Needed);
  let inputIndex = -1;

  const tiles = repeat(
    () =>
      Array.apply(null, { length: tilesPerHeight }).map(() => {
        return repeat(() => {
          inputIndex++;
          return createTile(this, input[inputIndex] ?? "no input");
        }, tilesPerWidth);
      }),
    numberOfA4Needed
  );

  tiles.forEach((tilesForOneA4, index) => {
    createA4(tilesForOneA4, `result_${index}`);
  });
}

function download(fileName, dataUrl) {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
