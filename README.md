# BoGaLa (BoardGameLanguage)

## TODO

- [X] ES6 modules - Don't need any bundlers or nonsense https://david-gilbertson.medium.com/es6-modules-in-the-browser-are-they-ready-yet-715ca2c94d09
- [X] Make it work on node
- [X] Make it work in asciidoc
- [ ] Accept one line at a time
- [ ] Order stacks so there are no overlapping issues
- [ ] Errors/warnings
- [ ] Square grids
- [ ] Stack placement on intersections
- [ ] Work in browser again with no changes
- Other language features:
  - [ ] Arrows
  - [ ] Lines
  - [ ] Letters
  - [ ] symbols
  - [ ] Piece facing
  - [ ] Chess pieces?

## Usage

Browser: (Currently broken)

1. ~Start a webserver in this dir (required because ES6)~
2. ~Load up index.html via that webserver~

Node:

```sh
node main-node.js [output_filename.svg] < blah.bogala
```

## Misc Notes

Could base it off sgf - http://dashstofsk.net/gorilla.html
http://dashstofsk.net/sgf.html Uses sgf to represent both go and hex boards, so
there's prior art for this.

Re: Running headless in node...

- https://newbedev.com/how-to-use-d3-in-node-js-properly
- Could use [svg.js][svg] instead of d3js: https://github.com/svgdotjs/svgdom
    - Official, node-friendly version of example visualization lib from
      honeycomb docs

I'd like to end up with something like
https://nestorgames.com/docs/YavalathCo2.pdf

[svg]: <https://svgjs.dev/docs/3.0/>
