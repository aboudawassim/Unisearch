import React from "react";
import Paper from "@mui/material/Paper";

function PathItem({ selected, char, onclick }) {
  return (
    <div>
      {selected ? (
        <Paper
          style={{ textAlign: "center", backgroundColor: "blue" }}
          onClick={() => onclick(char)}
        >
          <span style={{ color: "white" }}>{char}</span>
        </Paper>
      ) : (
        <Paper style={{ textAlign: "center" }} onClick={() => onclick(char)}>
          <span>{char}</span>
        </Paper>
      )}
    </div>
  );
}

export default PathItem;
