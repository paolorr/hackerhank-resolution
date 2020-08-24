// https://www.hackerrank.com/challenges/plus-minus/problem

'use strict';

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

// Complete the plusMinus function below.
function plusMinus(arr) {
  let pos = 0;
  let neg = 0;
  let zero = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      pos++;
    } else if (arr[i] < 0) {
      neg++;
    } else {
      zero++;
    }
  }

  console.log((pos / arr.length).toFixed(6));
  console.log((neg / arr.length).toFixed(6));
  console.log((zero / arr.length).toFixed(6));
}

function main() {
  const n = parseInt(readLine(), 10);

  const arr = readLine()
    .split(' ')
    .map(arrTemp => parseInt(arrTemp, 10));

  plusMinus(arr);
}
