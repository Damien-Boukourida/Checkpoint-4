import "./App.css";
import { Routes, Route } from "react-router-dom";

import Homepage from "@pages/Homepage";
import MyGames from "@pages/MyGames";
import Login from "@pages/Login";
import NotFound from "@pages/NotFound";
import NewGame from "@pages/NewGame";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mygames" element={<MyGames />} />
        <Route path="/login-register" element={<Login />} />
        <Route path="/new-game" element={<NewGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
