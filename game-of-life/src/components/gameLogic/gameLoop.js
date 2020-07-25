import React, { useState, useEffect } from "react";

import CreateGrid from "../render/grid.js";

function GameLoop() {
  const [size, setSize] = useState({ rows: 25, cols: 25 });
  const [board, setBoard] = useState(() => {
    //Initializing our grid inside of the useState
    const rows = [];
    for (let i = 0; i < size.rows; i++) {
      // This creates a row using the values we have set for size.
      rows.push(Array.from(Array(size.cols), () => 0));
    }
    return rows;
  });

  const [running, setRunning] = useState(() => {
    return false;
  });

  return (
    <div>
      <CreateGrid board={board} setBoard={setBoard} running={running} />
    </div>
  );
}

export default GameLoop;
