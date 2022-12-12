import React, { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "../../helpers/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function NewProductModal({
  setModalNewOpen,
  setToastOpen,
  setToastMessage,
  setToastStatus,
  getProducts,
}) {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [keys, setkeys] = useState([]);
  const [error, seterror] = useState("");
  function saveProduct() {
    validate();
    if (error === "") {
      // Save product to database
      const product = {
        name,
        description,
        keys: keys
          .split(" ")
          .filter((item) => item !== "")
          .concat(name),
      };
      axios
        .post("/products", product)
        .then((response) => {
          console.log(response);
          if (response.status != 200) {
            throw new Error();
          }
          setToastOpen(true);
          setToastMessage("Product added successfully");
          setToastStatus("success");
          setModalNewOpen(false);
          getProducts();
        })
        .catch((error) => {
          console.log(error);
          setToastOpen(true);
          setToastMessage("Add product failed");
          setToastStatus("error");
        });
    }
  }

  function validate() {
    seterror("");
    const ids = ["name", "descr", "keys"];
    ids.map((id) => {
      if (
        document.getElementById(id).required &&
        document.getElementById(id).value === ""
      ) {
        seterror("Required fields must be filled");
      }
    });
  }
  return (
    <Box sx={style}>
      <h3 style={{ marginBottom: "15px" }}>Add new product</h3>
      {/* <TextField
        required
        id="id"
        label="Identifier"
        variant="outlined"
        size="small"
        placeholder="Product identifier.."
        fullWidth
        style={{ marginBottom: "15px" }}
        value={identifier}
        onChange={(event) => setidentifier(event.target.value)}
      /> */}

      <TextField
        required
        id="name"
        label="Name"
        variant="outlined"
        size="small"
        placeholder="Product name .."
        fullWidth
        style={{ marginBottom: "15px" }}
        value={name}
        onChange={(event) => setname(event.target.value)}
      />
      <TextField
        id="descr"
        label="Description"
        variant="outlined"
        size="small"
        placeholder="Tap .."
        multiline
        fullWidth
        minRows={3}
        style={{ marginBottom: "15px" }}
        value={description}
        onChange={(event) => setdescription(event.target.value)}
      />
      <TextField
        required
        id="keys"
        label="Keys"
        variant="outlined"
        size="small"
        placeholder="Tap keys with , delimiter .."
        multiline
        fullWidth
        minRows={2}
        style={{ marginBottom: "15px" }}
        value={keys}
        onChange={(event) => setkeys(event.target.value)}
      />
      <span
        style={{
          color: "red",
          marginBottom: "10px",
        }}
      >
        {error}
      </span>
      <Button
        variant="contained"
        style={{ width: "100%" }}
        onClick={saveProduct}
      >
        Save
      </Button>
    </Box>
  );
}

export default NewProductModal;
