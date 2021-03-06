import Honeycomb from 'honeycomb-grid';
import { SVG } from "@svgdotjs/svg.js";
import generateBoard from './bogala-board-generator.js';

console.log("Lib loaded");

const colors = [ "DarkSlateGray", "white", "red", "yellow", "blue", "green" ];

let loadTestDataStructure = function() {
    return { board: { type: 'hexhex', size: 5 },
             stacks: [
                { pieces: [1], x: -2, y: -4 },
                { pieces: [1,0,1], x: -1, y: -4 },
                { pieces: [0,1,0], x: 0, y: -4 },

                { pieces: [0], x: -2, y: -3 },

                { pieces: [2], x: -1, y: -1 },
                { pieces: [0], x: 1, y: -1 },

                { pieces: [0], x: -2, y: 0 },
                { pieces: [1], x: 1, y: 0 },
                { pieces: [2], x: 2, y: 0 },

                { pieces: [2], x: -2, y: 1 },

                { pieces: [1,0,1], x: 0, y: 2 },
                { pieces: [1,0], x: 2, y: 2 },

                { pieces: [1], x: -1, y: 4 },
                { pieces: [0,1,0], x: 0, y: 4 },
                { pieces: [1], x: 1, y: 4 },
             ]
    };
}

let convertToDataStructure = function(strCode) {
    let data = {
        board: { type: 'undefined', params: null },
        stacks: []
    };

    const lines = strCode.split('\n');
    lines.forEach(line => {
        const tokens = line.match(/[^ ]+/g)
        if (tokens) {
            console.log(tokens);
            if (tokens[0] == 's') {
                data.stacks.push({
                    pieces: tokens[3].split(',').map(Number),
                    x: Number(tokens[1]),
                    y: Number(tokens[2]),
                })
            } else if (tokens[0] == 'board') {
                data.board.topology = tokens[1];
                data.board.shape = tokens[2];

                // Interpreted differently depending on topology and shape
                data.board.params = tokens.slice(3);
            }
        }
    });

    return data;
}

let convertToSvg = function(data, svgNode) {
    const board = generateBoard(data.board);
    console.log("Generated board: " + board);

    let canvas = SVG(svgNode).viewbox(board.viewbox());

    // an SVG symbol can be reused
    const tileSymbol = board.getTileSymbol(canvas);

    // Draw the board
    board.forEach((cell, i) => {
        console.log(cell);
        const c = cell.toPoint();
        canvas.use(tileSymbol)
            .move(c.x, c.y)
    })

    // Draw the stacks
    data.stacks.forEach((stack, i) => {
        const tilePos = board.getTile(stack.x, stack.y).toPoint()
        stack.pieces.forEach((piece, i) => {
            // Draw each piece in the stack
            canvas.circle()
                .radius(0.7)
                .translate(tilePos.x, tilePos.y - i*0.2)
                .fill(colors[piece])
                .stroke({width: 0.1, color: 'black'});
        })
    })

    return svgNode;
}

let parse = function(strCode, svgNode) {
    let data = convertToDataStructure(strCode);

    let svg = convertToSvg(data, svgNode);

    return svg
}

export { parse };
