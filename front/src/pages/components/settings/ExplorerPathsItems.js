import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import PathItem from "../../widgets/PathItem";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import axios from "../../../helpers/axios";

function ExplorerPathsItems() {
  const [newPath, setNewPath] = useState("");
  const [paths, setPaths] = useState([]);
  useEffect(() => {
    getExplorerPaths();
  }, []);

  function getExplorerPaths() {
    axios
      .get("/paths")
      .then((response) => {
        console.log(response);
        setPaths(response.data);
      })
      .catch((error) => console.log(error));
  }

  function onNewPathChange(event) {
    setNewPath(event.target.value);
  }

  function insertPath() {
    axios
      .post("paths", { path: newPath })
      .then((_) => {
        setNewPath("");
        getExplorerPaths();
      })
      .catch((error) => console.log(error));
  }

  function deletePath(id) {
    axios
      .delete(`paths/${id}`)
      .then((_) => getExplorerPaths())
      .catch((error) => console.log(error));
  }

  return (
    <div>
      {paths.map((path) => {
        return (
          <div
            style={{
              border: "1px solid grey",
              borderRadius: "5px",
              padding: "2%",
              marginBottom: "3px",
              marginTop: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                letterSpacing: "2px",
              }}
            >
              {path.path}
            </span>
            <Button onClick={() => deletePath(path.id)}>
              <DeleteIcon style={{ color: "orangered" }} />
            </Button>
          </div>
        );
      })}
      <div
        style={{
          border: "1px solid grey",
          borderRadius: "5px",
          marginTop: "10px",
          padding: "2%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          fullWidth
          id="pathTF"
          label="New path"
          variant="standard"
          placeholder="Copy paste the path here .. "
          value={newPath}
          onChange={(e) => onNewPathChange(e)}
        />
        <Button variant="outlined" onClick={insertPath}>
          <CheckIcon style={{ color: "green" }} />
        </Button>
      </div>

      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={4} style={{ cursor: "pointer" }}>
            <PathItem
              selected={paths.includes("C")}
              char="C"
              onclick={toggleCharToPaths}
            ></PathItem>
          </Grid>
          <Grid item xs={4} style={{ cursor: "pointer" }}>
            <PathItem
              selected={paths.includes("D")}
              char="D"
              onclick={toggleCharToPaths}
            ></PathItem>
          </Grid>
          <Grid item xs={4} style={{ cursor: "pointer" }}>
            <PathItem
              selected={paths.includes("E")}
              char="E"
              onclick={toggleCharToPaths}
            ></PathItem>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} style={{ marginTop: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4} style={{ cursor: "pointer" }}>
            <PathItem
              selected={paths.includes("F")}
              char="F"
              onclick={toggleCharToPaths}
            ></PathItem>
          </Grid>
          <Grid item xs={4} style={{ cursor: "pointer" }}>
            <PathItem
              selected={paths.includes("G")}
              char="G"
              onclick={toggleCharToPaths}
            ></PathItem>
          </Grid>
          <Grid item xs={4} style={{ cursor: "pointer" }}>
            <PathItem
              selected={paths.includes("H")}
              char="H"
              onclick={toggleCharToPaths}
            ></PathItem>
          </Grid>
        </Grid>
      </Box> */}
    </div>
  );
}

export default ExplorerPathsItems;
