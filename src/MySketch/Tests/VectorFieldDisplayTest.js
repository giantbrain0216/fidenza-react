import React from "react";
import Sketch from "react-p5";
import createVectorField from "../VectorField";
import { useControls } from "leva";

let vectorField;
export default function VectorFieldDisplayTest(props) {
  // a perlin noise vector field grid is drawn with parameters to inspect sizing, resolution, color, and draw outline features.

  const controls = useControls({
    leftX: { value: 0, min: 0, max: 800 },
    rightX: { value: 800, min: 0, max: 800 },
    topY: { value: 0, min: 0, max: 800 },
    bottomY: { value: 800, min: 0, max: 800 },
    drawResolution: { value: 5, min: 1, max: 30 },
    isColorDrawn: false,
    isLengthDrawn: false,
    isBorderDrawn: false,
    areArrowsDrawn: false
  });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
    p5.frameRate(30);
    vectorField = createVectorField(p5);
  };

  const draw = (p5) => {
    vectorField.leftX = controls.leftX;
    vectorField.rightX = controls.rightX;
    vectorField.topY = controls.topY;
    vectorField.bottomY = controls.bottomY;
    vectorField.drawResolution = controls.drawResolution;
    vectorField.isColorDrawn = controls.isColorDrawn;
    vectorField.isLengthDrawn = controls.isLengthDrawn;
    vectorField.isBorderDrawn = controls.isBorderDrawn;

    p5.background(255);
    vectorField.drawVisualizer();
  };

  return <Sketch setup={setup} draw={draw} />;
}
