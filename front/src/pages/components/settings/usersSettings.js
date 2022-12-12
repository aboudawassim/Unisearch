import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "../../../helpers/axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import UsersDataTable from "./usersDataTable";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import { FormControl, InputLabel, NativeSelect, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function UsersSettings() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [idEdit, setIdEdit] = useState(null);
  const [fullnameEdit, setFullnameEdit] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [passwordEdit, setPasswordEdit] = useState("");
  const [roleEdit, setRoleEdit] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function saveNewUser() {
    const user = {
      name: fullname,
      username: username,
      password: password,
      roles: [role],
    };
    axios
      .post("users", user)
      .then((response) => {
        console.log(response);
        getUsers();
      })
      .catch((error) => console.log(error));
    setFullname("");
    setUsername("");
    handleClose();
  }
  function updateUser() {
    const user = {
      name: fullnameEdit,
      username: usernameEdit,
      password: password,
      roles: [roleEdit],
    };
    axios
      .patch(`users/${idEdit}`, user)
      .then((response) => {
        console.log(response);
        getUsers();
      })
      .catch((error) => console.log(error));
    setIdEdit(null);
    setFullnameEdit("");
    setUsernameEdit("");
    handleCloseEdit();
  }

  function deleteUser(id) {
    axios
      .delete("users/" + id)
      .then((response) => {
        console.log(response);
        const updatedUsersList = users.filter((user) => user.id !== id);
        setUsers(updatedUsersList);
      })
      .catch((error) => console.log(error));
  }

  const roles = [
    { id: "ResponsableMQ", role: "ResponsableMQ" },
    { id: "ResponsableCQ", role: "ResponsableCQ" },
    { id: "ResponsableCOND", role: "ResponsableCOND" },
    { id: "ResponsablePROD", role: "ResponsablePROD" },
    { id: "Pharmacien", role: "Pharmacien" },
  ];

  function getUsers() {
    axios
      .get("users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  var card = (
    <CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold" }}
          color="#8CA2EA"
          gutterBottom
        >
          List of users
        </Typography>
        <Button
          variant="outlined"
          style={{ marginBottom: "10px" }}
          onClick={handleOpen}
          startIcon={<PersonAddAltIcon />}
        >
          Add new user
        </Button>
      </div>

      <UsersDataTable
        editUser={setUserToEdit}
        users={users}
        deleteUser={deleteUser}
      />
    </CardContent>
  );

  function setUserToEdit(user) {
    setIdEdit(user.id);
    setFullnameEdit(user.name);
    setUsernameEdit(user.username);
    setRoleEdit(user.roles[0]);
    handleOpenEdit();
  }

  return (
    <div>
      <Box
        sx={{
          width: "70vw",
        }}
      >
        <Card
          variant="outlined"
          style={{
            border: "2px solid #213d89",
            borderRadius: "10px",
            paddingLeft: "20px",
          }}
        >
          {card}
        </Card>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new user
          </Typography>
          <TextField
            id="fullname"
            fullWidth
            label="Fullname"
            variant="standard"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="username"
            fullWidth
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <FormControl
            style={{ width: "-webkit-fill-available", marginBottom: "30px" }}
          >
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Rôle
            </InputLabel>
            <NativeSelect
              id="productsList"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value={undefined}></option>
              {roles.length !== 0 ? (
                roles.map((role) => {
                  return <option value={role.id}>{role.role}</option>;
                })
              ) : (
                <option value={undefined} disabled>
                  No roles. Please add new one
                </option>
              )}
            </NativeSelect>
          </FormControl>
          <Button
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            onClick={saveNewUser}
            startIcon={<CheckIcon />}
          >
            save
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update user
          </Typography>
          <TextField
            id="fullnameEdit"
            fullWidth
            label="Fullname"
            variant="standard"
            value={fullnameEdit}
            onChange={(e) => setFullnameEdit(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="usernameEdit"
            fullWidth
            label="Username"
            variant="standard"
            value={usernameEdit}
            onChange={(e) => setUsernameEdit(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <FormControl
            style={{ width: "-webkit-fill-available", marginBottom: "30px" }}
          >
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Rôle
            </InputLabel>
            <NativeSelect
              id="roleEdit"
              onChange={(e) => setRoleEdit(e.target.value)}
              value={roleEdit}
            >
              {roles.length !== 0 ? (
                roles.map((role) => {
                  return <option value={role.id}>{role.role}</option>;
                })
              ) : (
                <option value={undefined} disabled>
                  No roles. Please add new one
                </option>
              )}
            </NativeSelect>
          </FormControl>
          <Button
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            onClick={updateUser}
            startIcon={<CheckIcon />}
          >
            Apply changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UsersSettings;
