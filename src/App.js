import React from "react";
import "./App.css";

import GameLoop from "./components/gameLogic/gameLoop.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Game Component will go here */}
        <GameLoop />
      </header>
    </div>
  );
}

export default App;
