import React from "react";
import Sketch from "react-p5";
import { createSliderGroup } from "../Utilities";
import createFlowField from "../FlowField";

export default function FlowFieldDisplayTest(props) {
    //a point grid is drawn with parameters to inspect sizing and resolution features
    let ff;
    let leftXSl, rightXSl, topYSl, bottomYSl, resolutionSl

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(800, 800).parent(canvasParentRef);
        ff = createFlowField(p5);
        [leftXSl, rightXSl, topYSl, bottomYSl, resolutionSl] = createSliderGroup(p5, [
            {min: -p5.width*0.5, max: p5.width*1.5, value: 0, label: "left X"},
            {min: -p5.width*0.5, max: p5.width*1.5, value: p5.width, label: "right X"},
            {min: -p5.height*0.5, max: p5.height*1.5, value: 0, label: "top Y"},
            {min: -p5.height*0.5, max: p5.height*1.5, value: p5.height, label: "bottom Y"},
            {min: 0.1, max: 100, value: 5}
        ]);
    }

    const draw = (p5) => { 
        ff.leftX = leftXSl.value();
        ff.rightX = rightXSl.value();
        ff.topY = topYSl.value();
        ff.bottomY = bottomYSl.value();
        ff.drawResolution = resolutionSl.value();
        
        p5.background(230);
        ff.drawVisualizer();
    }

    return <Sketch setup={setup} draw={draw} />
}