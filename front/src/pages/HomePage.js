import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, NativeSelect, Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ExplorerResult from "./components/ExplorerResult";
import EmailResult from "./components/EmailResult";
import Modal from "@mui/material/Modal";
import NewProductModal from "./widgets/NewProductModal";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import GmailScreen from "./GmailScreen";
import ActionDataTable from "./components/database/actionDataTable";
import AnomalieDataTable from "./components/database/anomalieDataTable";
import EmailDataTable from "./components/email/emailDataTable";
import ExplorerDataTable from "./components/explorer/explorerDataTable";
import axios from "../helpers/axios";
import ExplorerPathsItems from "./components/settings/ExplorerPathsItems";
// import { DatePicker } from "@material-ui/pickers";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const handleOpenNewProduct = () => setOpen(true);
  const handleCloseNewProduct = () => setOpen(false);
  const [products, setProducts] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState("");
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());

  const modules = [
    { key: 0, name: "Actions", component: <ActionDataTable /> },
    { key: 1, name: "Anomalies", component: <AnomalieDataTable /> },
    { key: 2, name: "Récalamations fournisseur" },
    { key: 3, name: "Demande changement" },
  ];

  useEffect(() => {
    checkPaths();
    getProducts();
  }, []);

  function handleProductChange(event) {
    setSelectedKeys(event.target.value);
  }
  function handleModuleChange(event) {
    setSelectedModule(event.target.value);
  }

  function getProducts() {
    axios
      .get(`/products`)
      .then((products) => {
        console.log("pppp ", products.data);
        setProducts(products.data);
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });
  }

  function checkPaths() {
    const paths = localStorage.getItem("paths");
    const products = localStorage.getItem("products");
    if (!paths) localStorage.setItem("paths", JSON.stringify([]));
    if (!products) localStorage.setItem("products", JSON.stringify([]));
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "1% 10%",
        }}
      >
        <h3>Search Engine Application</h3>
      </div>
      <div style={{ margin: "0 10% 50px 10%", display: "flex" }}>
        <FormControl
          style={{ width: "-webkit-fill-available", marginRight: "10px" }}
        >
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Search query - Product
          </InputLabel>
          <NativeSelect
            id="productsList"
            onChange={(e) => handleProductChange(e)}
          >
            <option value={undefined}></option>
            {products.length !== 0 ? (
              products.map((product) => {
                return <option value={product.keys}>{product.name}</option>;
              })
            ) : (
              <option value={undefined} disabled>
                No products. Please add new
              </option>
            )}
          </NativeSelect>
        </FormControl>
        <FormControl
          style={{ width: "-webkit-fill-available", marginRight: "10px" }}
        >
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Module
          </InputLabel>
          <NativeSelect
            id="productsList"
            onChange={(e) => handleModuleChange(e)}
          >
            <option value={undefined}></option>
            {modules.length !== 0 ? (
              modules.map((module) => {
                return <option value={module.key}>{module.name}</option>;
              })
            ) : (
              <option value={undefined} disabled>
                No modules. Please add new
              </option>
            )}
          </NativeSelect>
        </FormControl>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            autoOk
            label="Clearable"
            clearable
            disableFuture
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider> */}
        <Button
          variant="outlined"
          style={{ width: "20%" }}
          onClick={handleOpenNewProduct}
          startIcon={<AddIcon />}
        >
          Product
        </Button>
      </div>
      {/* Database result box */}
      {/* <ActionDataTable /> */}
      {modules.filter((m) => m.key == selectedModule)[0].component}
      <EmailDataTable />
      <ExplorerDataTable />
      {/* <DatabaseResult query={selectedKeys} /> */}
      {/* <ExplorerResult query={selectedKeys} /> */}
      {/* <EmailResult query={selectedKeys} /> */}
      <Modal
        open={open}
        onClose={handleCloseNewProduct}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewProductModal getproducts={getProducts} />
      </Modal>
      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
        <GmailScreen />
        <Divider style={{ margin: "50px 0" }}>Settings</Divider>
        <ExplorerPathsItems />
      </Drawer>
    </div>
  );
}

export default HomePage;
