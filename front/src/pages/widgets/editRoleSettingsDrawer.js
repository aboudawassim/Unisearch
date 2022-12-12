import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import axios from "../../helpers/axios";
import { Typography } from "@mui/material";

function EditRoleSettingsDrawer({ role, goBack, refresh }) {
  const [roleName, setRoleName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [permissions, setPermissions] = useState(role.permissions);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    axios
      .get("permissions")
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => console.log(error));

    // set selected permissions
    setSelectedPermissions(role.permissions.map((permission) => permission.id));
  }, []);

  function updateRole(id) {
    const roleEdit = {
      name: roleName,
      description: description,
      permissions: selectedPermissions,
    };
    axios
      .patch(`/roles/${role.id}`, roleEdit)
      .then((_) => {
        refresh();
        goBack();
      })
      .catch((error) => console.log(error));
  }

  function handlePermissionChange(event, permission) {
    const selectedP = {
      id: permission.id,
      name: permission.name,
    };
    var updatedList = [...selectedPermissions];
    if (event.target.checked) {
      updatedList = [...selectedPermissions, selectedP];
    } else {
      updatedList.splice(selectedPermissions.indexOf(selectedP), 1);
    }
    setSelectedPermissions(updatedList);
  }

  return (
    <FormControl
      component="fieldset"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40vw",
        padding: "0px 20px",
      }}
    >
      <FormLabel
        component="legend"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          minWidth: "-webkit-fill-available",
          marginBottom: "40px",
        }}
      >
        <h3
          style={{
            margin: "20px 20px 0px 20px",
          }}
        >
          Update role
        </h3>
        <Button
          variant="outlined"
          style={{
            width: "200px",
          }}
          onClick={updateRole}
        >
          <CheckIcon />{" "}
          <span style={{ marginLeft: "10px" }}> Apply changes</span>
        </Button>
      </FormLabel>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30vw",
          padding: "0px 10px",
        }}
      > */}
      {/*  */}
      <TextField
        fullWidth
        id="roleName"
        label="Role name"
        variant="standard"
        placeholder="Tap role name here "
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        style={{
          marginBottom: "20px",
        }}
      />
      <TextField
        id="descr"
        label="Description"
        size="small"
        placeholder="Tap .."
        multiline
        fullWidth
        minRows={3}
        style={{ marginBottom: "15px", marginTop: "15px" }}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Typography
        fontSize={15}
        fontWeight={"bold"}
        style={{
          color: "blue",
          marginTop: "10px",
        }}
      >
        Select permissions
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {permissions.map((permission, index) => (
          // <Checkbox
          //   checked={selectedPermissions.includes(permission.id)}
          //   value={permission.id}
          //   inputProps={{
          //     "aria-label": permission.name,
          //     title: permission.name,
          //   }}
          // />
          // />
          <FormControlLabel
            value={permission.id}
            control={
              selectedPermissions.includes(permission.id) ? (
                <Checkbox
                  color="success"
                  label={permission.name}
                  checked
                  onChange={(e) => handlePermissionChange(e, permission)}
                />
              ) : (
                <Checkbox
                  color="success"
                  label={permission.name}
                  onChange={(e) => handlePermissionChange(e, permission)}
                />
              )
            }
            label={permission.name}
            labelPlacement="start"
          />
        ))}
      </div>

      {/* <List
        sx={{
          bgcolor: "background.paper",
          marginRight: "20px",
          marginLeft: "20px",
          overflowY: "scroll",
          height: "400px",
        }}
      >
        {permissions.map((permission) => (
          <div
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              marginBottom: "5px",
              marginInline: "20px",
            }}
          >
            <ListItem
              alignItems="flex-start"
              key={permission.id}
              style={{
                alignItems: "left",
              }}
            >
              <ListItemText
                primary={
                  <strong>{permission.name.toString().toUpperCase()}</strong>
                }
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="subtitle1"
                    color="text.primary"
                  >
                    {permission.description}
                  </Typography>
                }
              />
              <ListItemButton
                style={{
                  maxWidth: "50px",
                }}
                onClick={null}
              >
                <Checkbox
                  color="success"
                  onChange={(e) => alert(e.target.value)}
                  label={permission.id}
                />
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List> */}
      {/* </div> */}
    </FormControl>
  );
}

export default EditRoleSettingsDrawer;
