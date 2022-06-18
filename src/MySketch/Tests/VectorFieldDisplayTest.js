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
    fOfX: plot({ expression: "cos(x)", graph: true }),
    fOfY: plot({ expression: "sin(x)", graph: true }),
    fDomain: { min: -10, max: 10, value: [-3.14, 3.14] },
    fRange: { min: -10, max: 10, value: [-3.14, 3.14] },
    graphRange: { min: -10, max: 10, value: [-3, 3] },
    graphDomain: { min: -10, max: 10, value: [-3, 3] },

    xDims: { min: 0, max: 800, value: [50, 750] },
    yDims: { min: 0, max: 800, value: [50, 750] },

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
    vectorField.f = (x, y) =>
      p5.createVector(controls.fOfX(x), controls.fOfY(y));
    vectorField.fDomain = {
      min: controls.fDomain[0],
      max: controls.fDomain[1]
    };
    vectorField.fRange = {
      min: controls.fRange[0],
      max: controls.fRange[1]
    };
    vectorField.graphDomain = {
      min: controls.graphDomain[0],
      max: controls.graphDomain[1]
    };
    vectorField.graphRange = {
      min: controls.graphRange[0],
      max: controls.graphRange[1]
    };

    vectorField.dims = {
      leftX: controls.xDims[0],
      rightX: controls.xDims[1],
      topY: controls.yDims[0],
      bottomY: controls.yDims[1]
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
