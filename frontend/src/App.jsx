import "./App.css";
import { Routes, Route } from "react-router-dom";

import Homepage from "@pages/Homepage";
import MyGames from "@pages/MyGames";
import Login from "@pages/Login";
import NotFound from "@pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mygames" element={<MyGames />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
