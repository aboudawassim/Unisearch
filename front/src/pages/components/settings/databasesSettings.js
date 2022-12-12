import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DatabasesDataTable from "./databasesDataTable";
import { Button } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import axios from "../../../helpers/axios";

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

function DatabasesSettings() {
  const [databases, setDatabases] = useState([]);
  // new database states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dialect, setDialect] = useState("");
  const [database, setDatabase] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // update database states
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const [dialectEdit, setDialectEdit] = useState("");
  const [databaseEdit, setDatabaseEdit] = useState("");
  const [hostEdit, setHostEdit] = useState("");
  const [portEdit, setPortEdit] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [passwordEdit, setPasswordEdit] = useState("");
  const [dbEditID, setDbEditID] = useState(null);

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
          List of databases
        </Typography>
        <Button
          variant="outlined"
          style={{ marginBottom: "10px" }}
          onClick={handleOpen}
          startIcon={<StorageIcon />}
        >
          Add new DB configuration
        </Button>
      </div>

      <DatabasesDataTable
        databases={databases}
        deleteDatabase={deleteDatabase}
        setEditingDatabase={openEditingDatabase}
      />
    </CardContent>
  );

  function openEditingDatabase(database) {
    setDialectEdit(database.dialect);
    setDatabaseEdit(database.database);
    setHostEdit(database.host);
    setUsernameEdit(database.username);
    setPortEdit(database.port);
    setDbEditID(database.id);
    handleEditOpen();
  }

  useEffect(() => {
    fetchDatabases();
  }, [databases]);

  function fetchDatabases() {
    axios
      .get("/database")
      .then((response) => {
        setDatabases(response.data);
      })
      .catch((error) => {
        console.log("Error in getting DB result => ", error);
      });
  }

  function deleteDatabase(id) {
    axios
      .delete(`/database/${id}`)
      .then((_) => fetchDatabases())
      .catch((err) => console.log(err));
  }

  function updateDatabase() {
    axios
      .patch(`/database/${dbEditID}`, {
        dialect: dialectEdit,
        username: usernameEdit,
        port: portEdit,
        host: hostEdit,
        database: databaseEdit,
        password: passwordEdit,
      })
      .then((_) => handleEditClose())
      .catch((err) => console.log(err));
  }

  function saveNewDatabase() {
    axios
      .post("/database", {
        dialect,
        database,
        host,
        username,
        password,
        port,
      })
      .then((_) => handleClose());
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
            Add new database configuration
          </Typography>
          <TextField
            id="dialect"
            fullWidth
            label="Dialect"
            variant="standard"
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="Database"
            fullWidth
            label="Database Name"
            variant="standard"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="host"
            fullWidth
            label="Host"
            variant="standard"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="port"
            fullWidth
            label="Port"
            variant="standard"
            value={port}
            onChange={(e) => setPort(e.target.value)}
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
          <TextField
            id="password"
            fullWidth
            label="Passord"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            onClick={saveNewDatabase}
            startIcon={<CheckIcon />}
          >
            {"Save"}
          </Button>
        </Box>
      </Modal>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update database configuration
          </Typography>
          <TextField
            id="dialect"
            fullWidth
            label="Dialect"
            variant="standard"
            value={dialectEdit}
            onChange={(e) => setDialectEdit(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="Database"
            fullWidth
            label="Database Name"
            variant="standard"
            value={databaseEdit}
            onChange={(e) => setDatabaseEdit(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="host"
            fullWidth
            label="Host"
            variant="standard"
            value={hostEdit}
            onChange={(e) => setHostEdit(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="port"
            fullWidth
            label="Port"
            variant="standard"
            value={portEdit}
            onChange={(e) => setPortEdit(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="username"
            fullWidth
            label="Username"
            variant="standard"
            value={usernameEdit}
            onChange={(e) => setUsernameEdit(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="password"
            fullWidth
            label="Passord"
            variant="standard"
            value={passwordEdit}
            onChange={(e) => setPasswordEdit(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            onClick={updateDatabase}
            startIcon={<CheckIcon />}
          >
            {"Apply changes"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default DatabasesSettings;
