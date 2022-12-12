import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SourceIcon from "@mui/icons-material/Source";

function ExplorerResult({ query }) {
  const baseURL = `http://localhost:8000/search/expo`;
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  function getResult() {
    setLoading(true);
    axios
      .get(baseURL, {
        params: {
          key: query.replace(",", "|"),
          paths: localStorage.getItem("paths"),
        },
      })
      .then((response) => {
        console.log("Got response ", response);
        setLoading(false);
        setResult(response.data);
      })
      .catch((error) => {
        console.log("Error in getting DB result => ", error);
        setLoading(false);
      });
  }
  return (
    <div style={{ margin: "10px 10%" }}>
      {/* <h5>Explorer Result ({result.length})</h5> */}
      <Button
        variant="contained"
        style={{ width: "20%", marginBottom: "10px" }}
        onClick={getResult}
      >
        Load Explorer Data ({result.length})
      </Button>
      <div
        style={{
          border: "3px solid grey",
          borderRadius: "5px",
          height: "200px",
          overflowY: "auto",
        }}
      >
        {/* <p
          style={{
            pointer: "pointer",
            display: "flex",
            padding: "5px 15px",
          }}
          onClick={() => alert("clicked")}
        >
          <SourceIcon style={{ marginRight: "10px" }} />
          <span>C:/path/to/selected/file</span>
        </p> */}
        {loading ? (
          <CircularProgress />
        ) : (
          result.map((item) => (
            <p
              style={{
                pointer: "pointer",
                display: "flex",
                padding: "5px 15px",
              }}
              onClick={() => alert("clicked")}
            >
              <SourceIcon style={{ marginRight: "10px" }} />
              <span>{item}</span>
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default ExplorerResult;
