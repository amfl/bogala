const colors = [ "black", "white", "red", "yellow", "blue", "green" ];

const pieces = [
    { color: [0], x: 2, y: 2 },
    { color: [1], x: 0, y: 0 },
    { color: [3], x: 1, y: -1 },
    { color: [2,0,1], x: 1, y: 0 },
];

// Generate a grid with the Honeycomb library
const Grid = Honeycomb.defineGrid();
// const grid = Grid.rectangle({ width: 4, height: 4 });
const grid = Grid.hexagon({ radius: 3 });
console.log(grid);

/////////////////////////////////////////////////////////

const svg = document.getElementById('main');

const hexbin = d3.hexbin();

const stackScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 3]);

// Draw the board
d3.select("svg")
    .selectAll('.grid')
    .data(grid)
    .enter()
    .append('path')
    .classed('grid', true)
    .attr('transform', d => {
        const c = d.toPoint();
        return `translate(${c.x}, ${c.y})`
    })
    .attr('d', hexbin.hexagon())
    // .attr('fill', d => colors[d.color])
    .attr('fill', 'lightgrey')
    .attr('stroke', 'white')
    .attr('stroke-width', '0.1');

// Draw the pieces
d3.select("svg")
    .selectAll('.stack')
    .data(pieces)
    .enter()
    .append('g')
    .attr('transform', d => {
        // Figure out where Honeycomb would stick this hex
        const h = Grid.Hex(d.x, d.y);
        const c = h.toPoint();
        return `translate(${c.x}, ${c.y})`
    })
    .classed('stack', true)
        .selectAll('.piece')
        .data(d => d.color)
        .enter()
        .append('circle')
        .classed('piece', true)
        .attr('fill', d => colors[d])
        .attr('stroke', 'black')
        .attr('stroke-width', '0.1')
        .attr('r', '0.7')
        .attr('transform', (d, i) => {
            return `translate(0, -${stackScale(i)})`
        })

// // No idea why this doesn't render anything.
// const mesh = document.createElement('path');
// mesh.setAttribute('d', hexbin.mesh());
// mesh.setAttribute('stroke', 'black');
// mesh.setAttribute('stroke-width', '0.1');
// mesh.setAttribute('fill', 'red');
// svg.appendChild(mesh);

console.log("All done");
