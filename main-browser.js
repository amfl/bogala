import {parse} from "/bogala-lib.js";

const pieces = [
    { color: [1], x: -2, y: -4 },
    { color: [1,0,1], x: -1, y: -4 },
    { color: [0,1,0], x: 0, y: -4 },

    { color: [0], x: -2, y: -3 },

    { color: [2], x: -1, y: -1 },
    { color: [0], x: 1, y: -1 },

    { color: [0], x: -2, y: 0 },
    { color: [1], x: 1, y: 0 },
    { color: [2], x: 2, y: 0 },

    { color: [2], x: -2, y: 1 },

    { color: [1,0,1], x: 0, y: 2 },
    { color: [1,0], x: 2, y: 2 },

    { color: [1], x: -1, y: 4 },
    { color: [0,1,0], x: 0, y: 4 },
    { color: [1], x: 1, y: 4 },
];

const bogalaCode = `
board hexhex 5
s -2 -4 1
s -1 -4 1,0,1
s 1 -4  0,1,0

s -3 -2 0

s -1 -1 2
s  1 -1 0

s -2 0 0
s 1 0 1
s 2 0 2

s -2 1 2

s 0 2 1,0,1
s 2 2 1,0

s -1 4 1
s 0 4 0,1,0
s 1 4 1
`

console.log("Sup");

// Generate svg
let svg = parse(bogalaCode);

// Populate svg
let div = document.getElementById('main');
div.innerHTML = svg
