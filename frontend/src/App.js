// import logo from './logo.svg';
import './App.css';
import { Routes, Route, } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import Chatpage from "./pages/Chatpage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage/>} exact />
        <Route path="/chats" element={<Chatpage/>} />
      </Routes>
    </div>
  );
}

export default App;
