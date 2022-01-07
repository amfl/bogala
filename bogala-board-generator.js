import HexBoard from './bogala-board-hex.js';
import RectBoard from './bogala-board-rect.js';

export default function generateBoard(boardSpec) {
    if (boardSpec.topology == 'hex') {
        return new HexBoard(boardSpec);
    }
    else if (boardSpec.topology == 'rect') {
        return new RectBoard(boardSpec);
    }
    else { console.assert(false, "Cannot generate board: Board is invalid type"); }
};
