import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";

import CreateGrid from "../render/grid.js";
import ControlPanel from "../render/controlPanel.js";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

function GameLoop() {
  //############################################################
  //States used by game
  const [size, setSize] = useState({ rows: 36, cols: 36 });

  const [board, setBoard] = useState(() => {
    //Initializing our grid inside of the useState
    const rows = [];
    for (let i = 0; i < size.rows; i++) {
      // This creates a row using the values we have set for size.
      rows.push(Array.from(Array(size.cols), () => 0));
    }
    return rows;
  });

  const [gen, setGen] = useState(0);

  const [running, setRunning] = useState(() => {
    return false;
  });
  const runRef = useRef(running);
  runRef.current = running;

  //############################################################
  //Helper Functions below

  //Resets the board at it's current size to a blank board
  const resetBoard = () => {
    const rows = [];
    for (let i = 0; i < size.rows; i++) {
      // This creates a row using the values we have set for size.
      rows.push(Array.from(Array(size.cols), () => 0));
    }
    setBoard(rows);
    setGen(0);
  };

  //Randomizes the board at the current size to a 50/50 board
  const randomizeBoard = () => {
    const rows = [];
    for (let i = 0; i < size.rows; i++) {
      const row = [];
      for (let j = 0; j < size.cols; j++) {
        if (Math.round(Math.random()) === 1) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
      rows.push(row);
    }
    setBoard(rows);
  };

  //Updates the Generation Counter when called
  const updateGen = () => {
    console.log("Ran Update Gen");
    setGen((gen) => gen + 1);
  };

  //############################################################
  //Running loop

  const runGame = useCallback(() => {
    if (!runRef.current) {
      return;
    }
    updateGen();
    setBoard((b) => {
      //Using produce to create a deep copy. Prevents overwriting with a reference
      return produce(b, (boardCopy) => {
        for (let i = 0; i < size.rows; i++) {
          for (let j = 0; j < size.cols; j++) {
            let counter = 0;
            //Looping through the operations identified in the variable above
            operations.forEach(([x, y]) => {
              let locX = i + x;
              let locY = j + y;
              if (
                locX >= 0 &&
                locX < size.rows &&
                locY >= 0 &&
                locY < size.cols
              ) {
                counter += b[locX][locY];
              }
            });
            if (counter < 2 || counter > 3) {
              boardCopy[i][j] = 0;
            } else if (b[i][j] === 0 && counter === 3) {
              boardCopy[i][j] = 1;
            }
          }
        }
      });
    });
    //Re-Run every .5 seconds as long as running is true
    setTimeout(runGame, 250);
    //Run Once
  }, []);

  return (
    <div>
      <h2>{`Generation: ${gen}`}</h2>
      <CreateGrid
        board={board}
        setBoard={setBoard}
        running={running}
        gen={gen}
        setGen={setGen}
      />
      <ControlPanel
        setRunning={setRunning}
        running={running}
        runRef={runRef}
        runGame={runGame}
        setGen={setGen}
        setSize={setSize}
        resetBoard={resetBoard}
        randomizeBoard={randomizeBoard}
      />
    </div>
  );
}

export default GameLoop;
