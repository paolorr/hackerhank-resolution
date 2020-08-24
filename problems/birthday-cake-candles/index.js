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

// Complete the birthdayCakeCandles function below.
function birthdayCakeCandles(ar) {
  let tallest = ar[0];
  let count = 1;

  for (let i = 1; i < ar.length; i++) {
    if (ar[i] === tallest) {
      count++;
    } else if (ar[i] > tallest) {
      tallest = ar[i];
      count = 1;
    }
  }

  return count;
}

function main() {
  const arCount = parseInt(readLine(), 10);

  const ar = readLine()
    .split(' ')
    .map(arTemp => parseInt(arTemp, 10));

  const result = birthdayCakeCandles(ar);

  console.log(result);
}
