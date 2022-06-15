import React from "react";
import Sketch from "react-p5";
import "./App.css";
import { useControls } from "leva";
import VectorFieldDisplayTest from "./MySketch/Tests/VectorFieldDisplayTest";

function App() {
  return (
    <div className="App">
      <h1>Vector Field Test</h1>
      <div>
        <VectorFieldDisplayTest />
      </div>
    </div>
  );
}

export default App;
