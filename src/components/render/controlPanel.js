import React from "react";
import styled from "styled-components";

const Action = styled.button`
  border: none;
  border-radius: 2px;
  font-size: 20px;
  background: white;
  color: #008cba;
  style: none;
  padding: 10px 20px;
  margin: 0px 10px;
`;

const Start = styled.button`
  border: none;
  border-radius: 2px;
  font-size: 20px;
  color: white;
  style: none;
  padding: 10px 20px;
  margin: 0px 10px;
`;

function ControlPanel(props) {
  return (
    <div>
      <Start
        onClick={() => {
          props.setRunning(!props.running);
          if (!props.running) {
            props.runRef.current = true;
            props.runGame();
          }
        }}
        style={props.running ? { background: "red" } : { background: "green" }}
      >
        {props.running ? "Stop" : "Start"}
      </Start>
      <Action
        onClick={() => {
          if (props.running) {
            props.runRef.current = false;
            props.setRunning(!props.running);
          }
          props.setGen(0);
          props.resetBoard();
        }}
      >
        Reset
      </Action>
      <Action
        onClick={() => {
          if (!props.running) {
            props.setGen(0);
            props.randomizeBoard();
          }
        }}
      >
        Randomize
      </Action>
      <Action
        onClick={() => {
          if (!props.running) {
            props.runRef.current = true;
            props.runGame();
            props.runRef.current = false;
          }
        }}
      >
        One Generation
      </Action>
    </div>
  );
}

export default ControlPanel;
