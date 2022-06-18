import React from "react";
import Sketch from "react-p5";
import "./App.css";
import { useControls } from "leva";
import VectorFieldDisplayTest from "./MySketch/Tests/VectorFieldDisplayTest";
import VectorFieldPerlinTest from "./MySketch/Tests/VectorFieldPerlinTest";

function App() {
  return (
    <div className="App">
      <h1>Vector Field Test</h1>
      <div>
        <VectorFieldPerlinTest />
      </div>
    </div>
  );
}

export default App;
