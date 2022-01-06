console.log("Lib loaded");

const colors = [ "black", "white", "red", "yellow", "blue", "green" ];

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
        board: { type: 'undefined', size: 5 },
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
                data.board.type = tokens[1];
                data.board.size = Number(tokens[2]);
            }
        }
    });

    return data;
}

let createCanvas = function() {
    return SVG().addTo('body').size(600, 600).viewbox(-8, -8, 16, 16);
}

let convertToSvg = function(data) {
    console.assert(data.board.type == 'hexhex');
    console.assert(data.board.size == 5);

    // Generate a grid with the Honeycomb library
    const Grid = Honeycomb.defineGrid();
    const Hex = Honeycomb.extendHex({ size: 1, origin: [0.8660254037844386, 1] })

    const corners = Hex().corners()

    // const grid = Grid.rectangle({ width: 4, height: 4 });
    const board = Grid.hexagon({ radius: data.board.size - 1 });
    console.log(board);

    let canvas = createCanvas();

    // an SVG symbol can be reused
    const hexSymbol = canvas.symbol()
        // map the corners' positions to a string and create a polygon
        .polygon(corners.map(({ x, y }) => `${x},${y}`))
        .fill('lightgrey')
        .stroke({ width: 0.1, color: 'white' })

    // Draw the board
    board.forEach((cell, i) => {
        console.log(cell);
        const c = cell.toPoint();
        canvas.use(hexSymbol).translate(c.x, c.y)
    })

    // Draw the stacks
    data.stacks.forEach((stack, i) => {
        const h = Grid.Hex(stack.x, stack.y);
        const c = h.toPoint();
        stack.pieces.forEach((piece, i) => {
            // Draw each piece in the stack
            canvas.circle()
                .radius(0.7)
                .translate(c.x, c.y - i*0.2)
                .fill(colors[piece])
                .stroke({width: 0.1, color: 'black'});
        })
    })

    return canvas;
}

let parse = function(strCode) {
    let data = convertToDataStructure(strCode);
    // console.log(data);

    let svg = convertToSvg(data);

    return svg
}

/**
 * @namespace {Object} BoGaLa
 */

export { parse };
