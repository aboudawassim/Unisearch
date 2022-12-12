import React, { useState } from "react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import EmailRowItem from "../widgets/EmailRowItem";

function EmailResult({ query }) {
  const baseURL = `http://localhost:8000/search/gmail`;
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  function getResult() {
    setLoading(true);
    axios
      .get(baseURL, {
        params: {
          accessToken: localStorage.getItem("accessToken"),
          key: query.replace(",", " OR "),
        },
      })
      .then((response) => {
        console.log("Got response ", response);
        setLoading(false);
        setResult(response.data);
      })
      .catch((error) => {
        console.log("Error in getting email result => ", error);
        setLoading(false);
      });
  }
  return (
    <div style={{ margin: "10px 10%" }}>
      <Button
        variant="contained"
        style={{ width: "20%", marginBottom: "10px" }}
        onClick={getResult}
      >
        Load Gmail Data ({result.length})
      </Button>
      <div
        style={{
          border: "3px solid grey",
          borderRadius: "5px",
          height: "200px",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          result.map((item, index) => {
            return <EmailRowItem key={index} item={item} />;
          })
        )}
      </div>
    </div>
  );
}

export default EmailResult;
