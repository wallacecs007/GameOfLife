import React from "react";
import "./App.css";

import styled from "styled-components";

import GameLoop from "./components/gameLogic/gameLoop.js";

const Rules = styled.div`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 20px;
  margin: 0;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>John Conway's Game of Life</h2>
        <GameLoop />
        <Rules>
          <h6>Rules</h6>
          <List>
            <ListItem>
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </ListItem>
            <ListItem>
              Any live cell with two or three life neighbours lives on to the
              next generation.
            </ListItem>
            <ListItem>
              Any live cell with more than three live neighbours diers, as if by
              overpopulation.
            </ListItem>
            <ListItem>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </ListItem>
          </List>
        </Rules>
      </header>
    </div>
  );
}

export default App;
