import Honeycomb from 'honeycomb-grid';
import Board from './bogala-board.js';

const Grid = Honeycomb.defineGrid();
const Hex = Honeycomb.extendHex({ size: 1, origin: [0.8660254037844386, 1] })

export default class HexBoard extends Board {
    constructor(boardSpec) {
        super();

        // const grid = Grid.rectangle({ width: 4, height: 4 });
        this.grid = Grid.hexagon({ radius: Number(boardSpec.params) - 1 });
    }
    getTileSymbol(canvas) {
        const corners = Hex().corners()

        let tileSymbol = canvas.symbol()
            // map the corners' positions to a string and create a polygon
            .polygon(corners.map(({ x, y }) => `${x},${y}`))
            .fill('lightgrey')
            .stroke({ width: 0.1, color: 'white' })

        return tileSymbol;
    }
    getTile(x, y) { return Grid.Hex(x, y); }
    forEach(...args) { return this.grid.forEach(...args); }
    viewbox() {
        const w = this.grid.pointWidth(),
              h = this.grid.pointHeight() + 0.5; // Add some height for stacks off the top
        return [-w/2, -h/2, w, h];
    }
}
