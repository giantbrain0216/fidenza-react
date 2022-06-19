import React from "react";
import Sketch from "react-p5";
import "./App.css";
import { useControls } from "leva";
import VectorFieldDisplayTest from "./MySketch/Tests/VectorFieldDisplayTest";
import VectorFieldPerlinTest from "./MySketch/Tests/VectorFieldPerlinTest";
import FidenzaSketch from "./MySketch/FidenzaSketch";
import VectorFieldCurveTest from "./MySketch/Tests/VectorFieldCurveTest";

function App() {
  return (
    <div className="App">
      <div>
        <h1> Fidenza Challenge </h1>
        <VectorFieldCurveTest />
      </div>
    </div>
  );
}

export default App;
