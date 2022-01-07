import {parse} from "./bogala-lib.js";
import { createSVGWindow } from "svgdom";
import { SVG, registerWindow } from "@svgdotjs/svg.js";

import process from 'process';
import * as fs from 'fs';

// returns a window with a document and an svg root node
const window = createSVGWindow()
const document = window.document

// register window and document
registerWindow(window, document)

var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const bogalaCode = stdinBuffer.toString();

const svgNode = document.documentElement
parse(bogalaCode, svgNode);

// console.log(svgNode.outerHTML)
console.log("Done");

console.log(process.argv);
if (process.argv.length > 2) {
    let filename = process.argv[2];
    fs.writeFile(filename, svgNode.outerHTML, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
}
