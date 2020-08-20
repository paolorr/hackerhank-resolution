// https://www.hackerrank.com/challenges/matrix-rotation-algo/problem

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the matrixRotation function below.
function matrixRotation(matrix, r) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const newMatrix = rotateMatrix(matrix, r, 0, 0, rows, columns);

  for (let i = 0; i < rows; i++) {
    console.log(newMatrix[i].join(' '));
  }
}

function rotateMatrix(matrix, rotations, startX, startY, rows, columns) {
  let layers = [];

  let layer;
  const tempLayer = [];
  for (let row = 0; row < rows; row++) {
    if (row === 0) {
      layer = [...matrix[row + startX].slice(startY, columns + startY)];
    } else if (row === rows - 1) {
      layer = [
        ...layer,
        ...matrix[row + startX].slice(startY, columns + startY).reverse(),
      ];
    } else {
      layer.push(matrix[row + startX][columns + startY - 1]);
      tempLayer.push(matrix[row + startX][startY]);
    }
  }
  layer = [...layer, ...tempLayer.reverse()];

  layers.push(rotateLayer(layer, rotations));

  if (rows > 2 && columns > 2) {
    const innerLayers = rotateMatrix(
      matrix,
      rotations,
      startX + 1,
      startY + 1,
      rows - 2,
      columns - 2,
    );

    layers = [...layers, ...innerLayers];
  }

  if (startX === 0) {
    const newMatrix = new Array(rows)
      .fill()
      .map(i => new Array(columns).fill(''));
    return transformLayersToMatrix(newMatrix, layers, 0, rows, columns);
  }

  return layers;
}

function rotateLayer(layer, rotations) {
  const mod = rotations % layer.length;
  if (mod === 0) {
    return layer;
  }
  return [...layer.slice(mod), ...layer.slice(0, mod)];
}

function transformLayersToMatrix(matrix, layers, layerIndex, rows, columns) {
  if (layerIndex >= layers.length) {
    return matrix;
  }

  let currentLayer = layers[layerIndex];

  for (let i = 0; i < columns; i++) {
    matrix[layerIndex][layerIndex + i] = currentLayer[i];
  }

  currentLayer = currentLayer.slice(columns);

  let offset;
  if (rows > columns) {
    offset = 1;
  } else if (rows < columns) {
    offset = 3;
  } else {
    offset = 2;
  }

  const lastRow = currentLayer
    .slice(columns - offset, columns + rows - 2)
    .reverse();

  for (let i = 0; i < columns; i++) {
    matrix[layerIndex + rows - 1][layerIndex + i] = lastRow[i];
  }

  currentLayer.splice(columns - 1, rows - 1);

  for (let i = 0; i < rows - 2; i++) {
    matrix[layerIndex + i + 1][layerIndex] =
      currentLayer[currentLayer.length - i - 1];
    matrix[layerIndex + i + 1][layerIndex + columns - 1] = currentLayer[i];
  }

  return transformLayersToMatrix(
    matrix,
    layers,
    layerIndex + 1,
    rows - 2,
    columns - 2,
  );
}

function main() {
  const mnr = readLine().replace(/\s+$/g, '').split(' ');

  const m = parseInt(mnr[0], 10);

  const n = parseInt(mnr[1], 10);

  const r = parseInt(mnr[2], 10);

  const matrix = Array(m);

  for (let i = 0; i < m; i++) {
    matrix[i] = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map(matrixTemp => parseInt(matrixTemp, 10));
  }

  matrixRotation(matrix, r);
}
