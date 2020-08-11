import React from "react";
import styled from "styled-components";
import produce from "immer";

const Cell = styled.div`
  width: 15px;
  height: 15px;
  border: 0.5px solid lightgray;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function CreateGrid(props) {
  return (
    <>
      <Grid
        style={{
          backgroundImage: "linear-gradient(purple, blue)",
        }}
      >
        {props.board.map((rows, i) => (
          <Row key={`${i}`}>
            {rows.map((col, j) => (
              <Cell
                key={`${i}-${j}`}
                onClick={() => {
                  if (!props.running) {
                    const newBoard = produce(props.board, (boardCopy) => {
                      boardCopy[i][j] = props.board[i][j] ? 0 : 1;
                    });
                    props.setBoard(newBoard);
                  }
                }}
                style={{
                  backgroundColor: props.board[i][j] ? undefined : "white",
                }}
              />
            ))}
          </Row>
        ))}
      </Grid>
    </>
  );
}

export default CreateGrid;
