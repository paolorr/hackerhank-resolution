// https://www.hackerrank.com/challenges/bomber-man/problem

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the bomberMan function below.
function bomberMan(n, grid) {
  grid = grid.map(row => row.split(''));
  initializeBombs(grid);

  // i start on 2 because the first second it does nothing and it's not repeated so we can skip it
  for (let i = 2; i <= n; i++) {
    decreaseBombsTimer(grid);
    if (i % 2 === 0) {
      plantBombs(grid);
    }
  }

  return grid.map(row => row.join('').replace(/[1-3]/g, 'O'));
}

function initializeBombs(grid) {
  grid.forEach(row => {
    row.forEach((item, index) => {
      if (item === 'O') {
        row[index] = '2';
      }
    });
  });
}

function plantBombs(grid) {
  grid.forEach(row => {
    row.forEach((item, index) => {
      if (item === '.') {
        row[index] = '3';
      }
    });
  });
}

function decreaseBombsTimer(grid) {
  grid.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      if (item === '1') {
        detonateBomb(grid, rowIndex, colIndex);
        row[colIndex] = '.';
      } else if (item === '2') {
        row[colIndex] = '1';
      } else if (item === '3') {
        row[colIndex] = '2';
      }
    });
  });
}

function detonateBomb(grid, bombRow, bombCol) {
  const maxRow = grid.length - 1;
  const maxCol = grid[0].length - 1;
  const row1 = bombRow - 1;
  if (row1 >= 0) {
    clearCell(grid, row1, bombCol);
  }
  const col1 = bombCol - 1;
  if (col1 >= 0) {
    clearCell(grid, bombRow, col1);
  }
  const row2 = bombRow + 1;
  if (row2 <= maxRow) {
    clearCell(grid, row2, bombCol);
  }
  const col2 = bombCol + 1;
  if (col2 <= maxCol) {
    clearCell(grid, bombRow, col2);
  }
}

function clearCell(grid, row, col) {
  if (grid[row][col] !== '1') {
    grid[row][col] = '.';
  }
}

function printGrid(grid) {
  grid.forEach(row => {
    console.log(row);
  });
}

function printGrid2(grid) {
  grid.forEach(row => {
    console.log(row.join(''));
  });
  console.log('\n');
}

function main() {
  const rcn = readLine().split(' ');

  const r = parseInt(rcn[0], 10);

  const c = parseInt(rcn[1], 10);

  const n = parseInt(rcn[2], 10);

  const grid = [];

  for (let i = 0; i < r; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const result = bomberMan(n, grid);

  printGrid(result);
}
