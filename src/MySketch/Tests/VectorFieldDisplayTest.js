import React from "react";
import Sketch from "react-p5";
import createVectorField from "../VectorField";
import { drawModes } from "../VectorField";
import { useControls } from "leva";
import { plot } from "@leva-ui/plugin-plot";

let vectorField;
export default function VectorFieldDisplayTest(props) {
  // a perlin noise vector field grid is drawn with parameters to inspect sizing, resolution, color, and draw outline features.

  const controls = useControls({
    y: plot({ expression: "cos(x)", graph: true }),
    leftX: { value: 0, min: 50, max: 800 },
    rightX: { value: 750, min: 0, max: 800 },
    topY: { value: 50, min: 0, max: 800 },
    bottomY: { value: 750, min: 0, max: 800 },
    drawResolution: { value: 20, min: 1, max: 30 },
    drawVecScale: { value: 10, min: 0, max: 50 },
    drawMode: {
      options: {
        lines: drawModes.LINES,
        arrows: drawModes.ARROWS
      }
    },
    isColorDrawn: false,
    isLengthDrawn: false,
    isBorderDrawn: false
  });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
    p5.frameRate(30);
    vectorField = createVectorField(p5);
  };

  const draw = (p5) => {
    vectorField.dims = {
      leftX: controls.leftX,
      rightX: controls.rightX,
      topY: controls.topY,
      bottomY: controls.bottomY
    };

    vectorField.drawResolution = controls.drawResolution;
    vectorField.isColorDrawn = controls.isColorDrawn;
    vectorField.isLengthDrawn = controls.isLengthDrawn;
    vectorField.isBorderDrawn = controls.isBorderDrawn;
    vectorField.drawMode = controls.drawMode;
    vectorField.drawVecScale = controls.drawVecScale;

    p5.background(255);
    vectorField.drawVisualizer();
  };

  return <Sketch setup={setup} draw={draw} />;
}
