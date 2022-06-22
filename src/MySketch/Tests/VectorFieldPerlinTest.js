import React from "react";
import Sketch from "react-p5";
import createVectorField from "../VectorField";
import { drawModes } from "../VectorField";
import { useControls } from "leva";

let vectorField;
let curves;

export default function VectorFieldPerlinTest(props) {
  // a perlin noise vector field grid is drawn with parameters to inspect sizing, resolution, color, and draw outline features.

  const controls = useControls({
    perlinLod: { value: 7, min: 1, max: 20 },
    perlinFalloff: { value: 0.6, min: 0, max: 1 },
    perlinSeed: { value: 20, min: 0, max: 30 },
    graphScale: { min: 0, max: 20, value: 4 },

    xDims: { min: 0, max: 800, value: [50, 750] },
    yDims: { min: 0, max: 800, value: [50, 750] },

    drawResolution: { value: 20, min: 45, max: 60 },
    drawVecScale: { value: 10, min: 0, max: 50 },
    drawMode: {
      options: {
        arrows: drawModes.ARROWS,
        lines: drawModes.LINES,
      }
    },

    isColorDrawn: false,
    isLengthDrawn: false,
  });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
    p5.frameRate(30);
    vectorField = createVectorField(p5);
    curves = [];
  };

  const draw = (p5) => {
    // p5.noiseSeed(controls.perlinSeed);
    // p5.noiseDetail(controls.perlinLod, controls.perlinFalloff)
    vectorField.perlinLod = controls.perlinLod;
    vectorField.perlinFalloff = controls.perlinFalloff;
    vectorField.perlinSeed = controls.perlinSeed;
    // vectorField.f = (x, y) => {
    //   const angle = p5.map(
    //     p5.noise(controls.noiseSeed + x, y),
    //     0,
    //     1,
    //     0,
    //     2 * p5.PI
    //   );
    //   const scale = p5.noise(x + controls.noiseSeed + 100, y + 100);
    //   let v = p5.createVector(0, scale);
    //   v.rotate(angle);
    //   return v;
    // };

    vectorField.graphDomain = {
      min: -controls.graphScale,
      max: controls.graphScale
    };
    vectorField.graphRange = {
      min: -controls.graphScale,
      max: controls.graphScale
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
    vectorField.drawMode = controls.drawMode;
    vectorField.drawVecScale = controls.drawVecScale;

    p5.background(255);
    //p5.circle(50, 50, 40);
    vectorField.setupPerlin();
    vectorField.drawVisualizer();
    for (const curve in curves) {
      curve.draw();
    }
  };


  return <Sketch setup={setup} draw={draw} />;
}
