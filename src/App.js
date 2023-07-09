import './design/App.css';
import Generator from './generator/Generator_main'
import MuiHome from './sandbox/MuiHome';
import { useNavigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    // <h1>Hello and Welcome to the Groove Assist App</h1>
    // <Generator/>
    // </div>
    <MuiHome/>
  );
}

export default App;
