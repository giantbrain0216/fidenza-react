import './App.css';
//import FidenzaSketch from './Sketch/FidenzaSketch';
import FlowFieldDisplayTest from './Sketch/Tests/FlowFieldDisplayTest';

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>
      <div style={{border: "medium solid black"}}>
        <FlowFieldDisplayTest />
      </div>
    </div>
  );
}

export default App;
