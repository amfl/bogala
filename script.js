const colors = [ "black", "white", "red", "yellow", "blue", "green" ];

const data = [
    { color: 0, x: 3, y: 2 },
    { color: 1, x: 0, y: 0 },
    { color: 2, x: 1, y: 0 }
];

/////////////////////////////////////////////////////////

const hexbin = d3.hexbin();

d3.select("svg")
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)
    .attr('d', hexbin.hexagon())
    .attr('fill', d => colors[d.color])
    .attr('stroke', 'black')
    .attr('stroke-width', '0.1');

console.log("All done");
