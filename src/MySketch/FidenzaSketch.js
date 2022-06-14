import React from "react";
import Sketch from "react-p5";

function FidenzaSketch () {
    const setup = (p, canvasParentRef) => {
        p.createCanvas(720, 720).parent(canvasParentRef);
    }

    const draw = (p) => {
        p.background(255);
        p.ellipse(p.mouseX, p.mouseY, 70, 70);
    }

    return <Sketch setup={setup} draw={draw} />
}

export default FidenzaSketch;