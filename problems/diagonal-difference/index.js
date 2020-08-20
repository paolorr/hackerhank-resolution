// https://www.hackerrank.com/challenges/diagonal-difference/problem

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

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr) {
  let sumLeftRight = 0;
  let sumRightLeft = 0;
  for (let i = 0; i < arr.length; i++) {
    sumLeftRight += arr[i][i];
    sumRightLeft += arr[i][arr.length - i - 1];
  }

  return Math.abs(sumLeftRight - sumRightLeft);
}

function main() {
  const n = parseInt(readLine().trim(), 10);

  const arr = Array(n);

  for (let i = 0; i < n; i++) {
    arr[i] = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map(arrTemp => parseInt(arrTemp, 10));
  }

  const result = diagonalDifference(arr);

  console.log(result);
}
