import React from "react";
import Sketch from "react-p5";
import "./App.css";
import { useControls } from "leva";
import FlowFieldDisplayTest from "./MySketch/Tests/FlowFieldDisplayTest";

//import FlowFieldDisplayTest from './Sketch/Tests/FlowFieldDisplayTest';
//TODO: Leva

function App() {
  return (
    <div className="App">
      <h1>Hello worldd</h1>
      <div style={{ border: "medium solid black" }}>
        <FlowFieldDisplayTest />
      </div>
    </div>
  );
}

export default App;
