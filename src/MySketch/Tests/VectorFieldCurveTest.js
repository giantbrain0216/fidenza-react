import React from "react";
import Sketch from "react-p5";
import createVectorField from "../VectorField";
import createFidenzaElement from "../FidenzaElement";
import { makeFidEleGrid } from "../FidenzaElement";
import { drawModes } from "../VectorField";
import { useControls } from "leva";
import palettes from "../ColorPalettes";

let vectorField;
let elements = [];

export default function VectorFieldPerlinTest(props) {
  // a perlin noise vector field grid is drawn with parameters to inspect sizing, resolution, color, and draw outline features.

  const controls = useControls({
    perlinLod: { value: 7, min: 1, max: 20 },
    perlinFalloff: { value: 0.70, min: 0, max: 1 },
    perlinSeed: { value: 20, min: 0, max: 30 },
    graphScale: { min: 0, max: 7, value: 4 },

    xDims: { min: 0, max: 800, value: [50, 750] },
    yDims: { min: 0, max: 800, value: [50, 750] },

    showVecField: false,
    drawResolution: { value: 100, min: 0, max: 100 },
    drawVecScale: { value: 10, min: 0, max: 50 },
    drawMode: {
      options: {
        lines: drawModes.LINES,
        arrows: drawModes.ARROWS
      }
    },

    isColorDrawn: false,
    isLengthDrawn: false,
  });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
    p5.frameRate(30);
    vectorField = createVectorField(p5);
    //elements = makeFidEleGrid(p5, vectorField);
  };

  const draw = (p5) => {
    // p5.noiseSeed(controls.perlinSeed);
    // p5.noiseDetail(controls.perlinLod, controls.perlinFalloff)
    vectorField.perlinLod = controls.perlinLod;
    vectorField.perlinFalloff = controls.perlinFalloff;
    vectorField.perlinSeed = controls.perlinSeed;

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

    p5.background(40);
    //p5.circle(50, 50, 40);
    vectorField.setupPerlin();

    if(controls.showVecField) {
      vectorField.drawVisualizer();
    }

    for (let element of elements) {
      element.display();
    }
  };

  const mousePressed = (p5) => {
    if (p5.mouseX > 50 && p5.mouseX < 750 && p5.mouseY > 50 && p5.mouseY < 750){
      elements.push(createFidenzaElement(p5, p5.mouseX, p5.mouseY, p5.color(p5.random(palettes.subtle)), p5.random(50), p5.random(20), vectorField)) ;
    } 
  }

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
}
