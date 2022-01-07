import Board from './bogala-board.js';
import Honeycomb from 'honeycomb-grid';
import RectTile from './bogala-tile-rect.js';

export default class RectBoard extends Board {
    constructor(boardSpec) {
        super();

        // TODO support rectangular boards
        console.assert(boardSpec.shape == 'square', "Rect topology must be of square shape");
        this.dimensions = [boardSpec.size, boardSpec.size];

        for (let i=0;i<this.dimensions[0];++i) {
            for (let j=0;j<this.dimensions[1];++j) {
                this.push(this.getTile(i,j));
            }
        }
    }
    getTileSymbol(canvas) {
        let tileSymbol = canvas.symbol()
            .rect(2, 2)
            .translate(-1, -1)
            .fill('lightgrey')
            .stroke({ width: 0.1, color: 'white' })

        return tileSymbol;
    }
    getTile(x, y) { return new RectTile(x, y); }
    viewbox() {
        const w = this.dimensions[0]*2,
              h = this.dimensions[1]*2;
        // Add some height for stacks off the top
        const stackBuffer = 0.5;
        return [-1, -1 - stackBuffer, w, h + stackBuffer];
    }
}
