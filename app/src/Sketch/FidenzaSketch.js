import React from "react";
import Sketch from "react-p5";

function FidenzaSketch (props) {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(720, 720).parent(canvasParentRef);
    }

    const draw = (p5) => {
        p5.background(255);
        p5.ellipse(p5.mouseX, p5.mouseY, 70, 70);
    }

    return <Sketch setup={setup} draw={draw} />
}

export default FidenzaSketch;