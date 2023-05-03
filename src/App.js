import './design/App.css';
import Generator from './Generator'
import { useNavigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <h1>Hello and Welcome to the Groove Assist App</h1>
    <Generator/>
    </div>
  );
}

export default App;
