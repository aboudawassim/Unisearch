import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
import { ListItemIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../helpers/axios";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ArchivesPage() {
  const [archives, setArchives] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [selectedArchiveId, setSelectedArchiveId] = useState(null);

  const handleClickOpen = (id) => {
    setSelectedArchiveId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {
    setOpen(false);
    axios
      .delete("/archives/" + id)
      .then((response) => {
        console.log();
        if (response.data.statusCode !== 200) {
          throw new Error();
        }
        setToastOpen(true);
        setToastMessage("Archive deleted successfully");
        setDeleteStatus(true);
        fetchArchives();
      })
      .catch((error) => {
        setToastOpen(true);
        setToastMessage("Delete failed");
        setDeleteStatus(false);
      });
  };

  const handleEmptyArchive = () => {
    setOpenDeleteAll(false);
    axios
      .delete("/archives")
      .then((response) => {
        console.log(response);
        if (response.data.statusCode !== 200) {
          throw new Error();
        }
        setToastOpen(true);
        setToastMessage(response.data.message);
        setDeleteStatus(true);
        fetchArchives();
      })
      .catch((error) => {
        console.log(error);
        setToastOpen(true);
        setToastMessage("Delete failed");
        setDeleteStatus(false);
      });
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  function fetchArchives() {
    axios
      .get("/archives")
      .then((response) => {
        setArchives(response.data);
      })
      .catch((error) => {
        console.log("Error getting archives : ", error);
      });
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={20} padding={5}>
          Actions' History
        </Typography>
        {archives.length > 0 ? (
          <Button
            style={{
              maxWidth: "50px",
            }}
            onClick={() => setOpenDeleteAll(true)}
          >
            <ListItemIcon>
              <ClearAllIcon />
            </ListItemIcon>
          </Button>
        ) : null}
      </div>
      <List
        sx={{
          bgcolor: "background.paper",
          marginRight: "20px",
          marginLeft: "20px",
        }}
      >
        {archives.map((archive) => (
          <div>
            <ListItem alignItems="flex-start" key={archive.id}>
              <ListItemAvatar>
                <HistoryIcon />
              </ListItemAvatar>
              <ListItemText
                primary={archive.content}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="h6"
                      color="text.primary"
                    >
                      {archive.owner}
                    </Typography>
                    {" — "}
                    {archive.createdAt}
                  </React.Fragment>
                }
              />
              <ListItemButton
                style={{
                  maxWidth: "50px",
                }}
                onClick={() => handleClickOpen(archive.id)}
              >
                <ListItemIcon>
                  <DeleteIcon style={{ color: "orangered" }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete archive item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to delete this archive item ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleClose}>
            Close
          </Button>
          <Button color="error" onClick={() => handleDelete(selectedArchiveId)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for clearing all archive */}
      <Dialog
        open={openDeleteAll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Empty Archive"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to empty actions' history ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={() => setOpenDeleteAll(false)}>
            Close
          </Button>
          <Button color="error" onClick={handleEmptyArchive}>
            Empty
          </Button>
        </DialogActions>
      </Dialog>
      {/* End clear all dialog */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={deleteStatus ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ArchivesPage;
