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

  // printMatrix(matrix);

  // console.log('\n');

  rotateMatrix(matrix, r, 0, 0, rows, columns);

  printMatrix(matrix);
}

function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join(' '));
  }
}

function rotateMatrix(matrix, rotations, startRow, startColumn, rows, columns) {
  if (rows < 2 || columns < 2) {
    return;
  }

  const layerLength = (rows + columns - 2) * 2;
  const requiredRotations = rotations % layerLength;

  for (let i = 0; i < requiredRotations; i++) {
    rotateLayer(matrix, startRow, startColumn, rows, columns);
  }

  rotateMatrix(
    matrix,
    rotations,
    startRow + 1,
    startColumn + 1,
    rows - 2,
    columns - 2,
  );
}

function rotateLayer(matrix, startRow, startColumn, rows, columns) {
  const layerLength = (rows + columns - 2) * 2;
  const lastItem = matrix[startRow + 1][startColumn];
  let currentRow;
  let currentColumn;
  let newRow;
  let newColumn;

  for (let i = 0; i < layerLength; i++) {
    newRow = currentRow;
    newColumn = currentColumn;
    if (i === 0) {
      currentRow = startRow;
      currentColumn = startColumn + i;
      newRow = currentRow + 1;
      newColumn = currentColumn;
    } else if (i > 0 && i < columns) {
      currentColumn += 1;
    } else if (i >= columns && i < columns + rows - 1) {
      currentRow += 1;
      currentColumn = startColumn + columns - 1;
    } else if (
      i >= columns + rows - 1 &&
      i < columns + rows - 1 + columns - 1
    ) {
      currentColumn -= 1;
    } else {
      currentRow -= 1;
    }

    matrix[newRow][newColumn] = matrix[currentRow][currentColumn];
  }
  if (rows === 2) {
    matrix[startRow + 1][startColumn + 1] = lastItem;
  } else {
    matrix[startRow + 2][startColumn] = lastItem;
  }
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
