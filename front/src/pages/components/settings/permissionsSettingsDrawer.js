import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import axios from "../../../helpers/axios";

function PermissionsSettingsDrawer() {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState("");
  useEffect(() => {
    getPermissions();
  }, []);

  function getPermissions() {
    axios
      .get("permissions")
      .then((response) => {
        console.log(response);
        setPermissions(response.data);
      })
      .catch((error) => console.log(error));
  }

  function insertNewPermission() {
    axios
      .post("/permissions", {
        name: newPermission,
      })
      .then((response) => {
        console.log(response);
        getPermissions();
      })
      .catch((error) => console.log(error));
    setNewPermission("");
  }

  function removePermission(id) {
    axios
      .delete(`/permissions/${id}`)
      .then((_) => {
        getPermissions();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div
      style={{
        width: "30vw",
        padding: "10px",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
        }}
      >
        Permissions managment
      </h3>
      {permissions.map((permission) => {
        return (
          <div
            style={{
              border: "1px solid #071439",
              borderRadius: "5px",
              padding: "2%",
              marginBottom: "3px",
              marginTop: "5px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#CAD1E5",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                letterSpacing: "2px",
              }}
            >
              {permission.name}
            </span>
            <Button onClick={() => removePermission(permission.id)}>
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
          label="New permission"
          variant="standard"
          placeholder="Tap new permission here .. "
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
        />
        <Button variant="outlined" onClick={insertNewPermission}>
          <CheckIcon style={{ color: "green" }} />
        </Button>
      </div>
    </div>
  );
}

export default PermissionsSettingsDrawer;
