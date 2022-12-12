import React, { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditProductModal({ product }) {
  const [name, setname] = useState(product.name);
  const [description, setdescription] = useState(product.description);
  const [keys, setkeys] = useState(product.keys ?? []);
  const [error, seterror] = useState("");
  function saveProduct() {
    validate();
  }

  function validate() {
    seterror("");
    const ids = ["id", "name", "descr", "keys"];
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
      <h3
        style={{
          marginBottom: "20px",
        }}
      >
        Edit product
      </h3>
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
        variant="outlined"
        style={{ width: "100%" }}
        onClick={saveProduct}
      >
        Apply
      </Button>
      <Button
        variant="contained"
        color="warning"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={saveProduct}
      >
        Annuler
      </Button>
    </Box>
  );
}

export default EditProductModal;
