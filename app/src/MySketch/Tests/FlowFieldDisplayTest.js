import React from "react";
import Sketch from "react-p5";
import createFlowField from "../FlowField";
import { useControls } from 'leva';

let ff;
export default function FlowFieldDisplayTest(props) {
    //a point grid is drawn with parameters to inspect sizing and resolution features
    const controls = useControls({
        leftX: {value: 0, min: 0, max: 500},
        rightX: {value: 500, min: 0, max: 500},
        topY: {value: 0, min: 0, max: 500},
        bottomY: {value: 500, min: 0, max: 500},
        drawResolution: {value: 5, min: 0.1, max: 30},
    })

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800, 800).parent(canvasParentRef);
        ff = new createFlowField(p5);
    }

    const draw = (p5) => { 
        ff.leftX = 0// controls.leftX;
        ff.rightX = 500//controls.rightX;
        ff.topY = 0//controls.topY;
        ff.bottomY = 500//controls.bottomY;
        ff.drawResolution = (controls.drawResolution);
        
        p5.background(230);
        ff.drawVisualizer();
    }

    return <Sketch setup={setup} draw={draw} />
}