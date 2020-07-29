import React from "react";
import styled from "styled-components";

const menu = styled.div``;

const action = styled.button``;

function ControlPanel(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.setRunning(!props.running);
          if (!props.running) {
            props.runRef.current = true;
            props.runGame();
          }
        }}
      >
        {props.running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          if (props.running) {
            props.runRef.current = false;
            props.setRunning(!props.running);
          }
          props.setGen(1);
          props.resetBoard();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default ControlPanel;
