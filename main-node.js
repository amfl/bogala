import {parse} from "./bogala-lib.js";
import { createSVGWindow } from "svgdom";
import { SVG, registerWindow } from "@svgdotjs/svg.js";

// returns a window with a document and an svg root node
const window = createSVGWindow()
const document = window.document

// register window and document
registerWindow(window, document)

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

const svgNode = document.documentElement
parse(bogalaCode, svgNode);

console.log(svgNode.outerHTML)
console.log("Done");
