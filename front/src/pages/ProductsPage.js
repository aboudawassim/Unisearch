import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import LabelIcon from "@mui/icons-material/Label";
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
import EditIcon from "@mui/icons-material/Edit";
import EditProductModal from "./widgets/EditProductModal";
import Modal from "@mui/material/Modal";
import NewProductModal from "./widgets/NewProductModal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNewOpen, setModalNewOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductForUpdate, setSelectedProductForUpdate] =
    useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error getting products : ", error);
      });
  }

  const handleEmptyProducts = () => {
    setOpenDeleteAll(false);
    axios
      .delete("/products")
      .then((response) => {
        console.log(response);
        if (response.data.statusCode !== 200) {
          throw new Error();
        }
        setToastOpen(true);
        setToastMessage(response.data.message);
        setDeleteStatus(true);
        fetchProducts();
      })
      .catch((error) => {
        console.log(error);
        setToastOpen(true);
        setToastMessage("Delete failed");
        setDeleteStatus(false);
      });
  };

  const handleDeleteProduct = (id) => {
    setSelectedProductId(id);
    setOpen(true);
  };

  const deleteProduct = (id) => {
    setOpen(false);
    axios
      .delete("/products/" + id)
      .then((response) => {
        if (response.data.statusCode !== 200) {
          throw new Error();
        }
        setToastOpen(true);
        setToastMessage("Product deleted successfully");
        setDeleteStatus(true);
        fetchProducts();
      })
      .catch((error) => {
        setToastOpen(true);
        setToastMessage("Delete failed");
        setDeleteStatus(false);
      });
  };

  const handleEditProduct = (product) => {
    setSelectedProductForUpdate(product);
    setModalOpen(true);
  };

  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100px",
        }}
      >
        <Typography fontSize={20} padding={5}>
          Products' List ({products.length})
        </Typography>
        {products.length > 0 ? (
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
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          m: "0px 40px 20px 40px",
          display: "flex",
          alignItems: "left",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search in products ..."
          inputProps={{ "aria-label": "search in products ..." }}
        />
        <IconButton
          color="warning"
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <ClearIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <SearchIcon />
        </IconButton>
      </Paper>
      <List
        sx={{
          bgcolor: "background.paper",
          marginRight: "20px",
          marginLeft: "20px",
          overflowY: "scroll",
          height: "400px",
        }}
      >
        {products.map((product) => (
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
              key={product.id}
              style={{
                alignItems: "center",
              }}
            >
              <ListItemAvatar>
                <LabelIcon />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <p>
                    <strong>{product.name.toString().toUpperCase()}</strong> ({" "}
                    {product.description} )
                  </p>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="subtitle1"
                      color="text.primary"
                    >
                      KEYS
                    </Typography>
                    {" — "}
                    {product.keys.map((key) => (
                      <span>{key} | </span>
                    ))}
                  </React.Fragment>
                }
              />
              <ListItemButton
                style={{
                  maxWidth: "50px",
                }}
                onClick={() => handleEditProduct(product)}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton
                style={{
                  maxWidth: "50px",
                }}
                onClick={() => handleDeleteProduct(product.id)}
              >
                <ListItemIcon>
                  <DeleteIcon style={{ color: "orangered" }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to delete this product ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            color="error"
            onClick={() => deleteProduct(selectedProductId)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for clearing all products */}
      <Dialog
        open={openDeleteAll}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDeleteAll(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete all products"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to delete all products ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={() => setOpenDeleteAll(false)}>
            Close
          </Button>
          <Button color="error" onClick={handleEmptyProducts}>
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
      {/* Edit product modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditProductModal product={selectedProductForUpdate} />
      </Modal>
      {/* End edit product modal */}
      {/* New product modal */}
      <Modal
        open={modalNewOpen}
        onClose={() => setModalNewOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewProductModal
          setModalNewOpen={setModalNewOpen}
          setToastOpen={setToastOpen}
          setToastMessage={setToastMessage}
          setToastStatus={setDeleteStatus}
          getProducts={fetchProducts}
        />
      </Modal>
      {/* End new product modal */}
      <Fab
        color="primary"
        aria-label="add"
        style={fabStyle}
        onClick={() => setModalNewOpen(true)}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default ProductsPage;
