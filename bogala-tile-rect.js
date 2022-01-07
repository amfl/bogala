import Honeycomb from 'honeycomb-grid';

// TODO Ideally, there should be a Tile Interface, with Honeycomb.Hex and
// Bogala.RectTile implementing it.
export default class RectTile {
    constructor(x,y) {
        this.p = Honeycomb.Point(x*2,y*2);
    }
    toPoint() {
        return this.p;
    }
}
