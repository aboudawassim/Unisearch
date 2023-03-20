import React, { useEffect, useState } from "react";
import {
FormControl,
InputLabel,
NativeSelect,
Button,
TextField
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import axios from "../helpers/axios";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ActionDataTable from "./components/database/actionDataTable";
import AnomalieDataTable from "./components/database/anomalieDataTable";
import DCDataTable from "./components/database/DCDataTable";
import EmailDataTable from "./components/email/emailDataTable";
import ExplorerDataTable from "./components/explorer/explorerDataTable";
import ExplorerPathsItems from "./components/settings/ExplorerPathsItems";
import GmailScreen from "./GmailScreen";
import EmailResult from "./components/EmailResult";
import ExplorerResult from "./components/ExplorerResult";
import NewProductModal from "./widgets/NewProductModal";


function HomePage() {
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const handleOpenNewProduct = () => setOpen(true);
  const handleCloseNewProduct = () => setOpen(false);
  const [products, setProducts] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState("");
  const [selectedModule, setSelectedModule] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [result, setResult] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
  

  const modules = [
    { key: 0, name: "Actions", component: <ActionDataTable /> },
    { key: 1, name: "Anomalies", component: <AnomalieDataTable /> },
    { key: 2, name: "Récalamations fournisseur" },
    { key: 3, name: "Demande changement", component: <DCDataTable/> },
  ];

  useEffect(() => {
    //checkPaths();
    getProducts();
  }, []);

  function handleProductChange(event) {
    setSelectedKeys(event.target.value);
  }

  function handleModuleChange(event) {
    setSelectedModule(event.target.value);
  }

  function handleSearch() {
    if (selectedKeys && selectedModule && startDate && endDate) {
    setLoading(true);
    setError(null);
    axios
    .get(`/search?product=${selectedKeys}&module=${selectedModule}&start=${startDate.toISOString()}&end=${endDate.toISOString()}`)
    .then((response) => {
      setResult(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
}
}
  
  function getProducts() {
    axios
      .get(`/products`)
      .then((products) => {
        console.log("la liste des produits ", products.data);
        setProducts(products.data);
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });
  }

  /*function checkPaths() {
    const paths = localStorage.getItem("paths");
    const products = localStorage.getItem("products");
    if (!paths) localStorage.setItem("paths", JSON.stringify([]));
    if (!products) localStorage.setItem("products", JSON.stringify([]));
  }*/
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
            required
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
            required
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
      ...
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
      ...
    </NativeSelect>
  </FormControl>
  <DatePicker
    label="Start Date"
    value={startDate}
    onChange={(newValue) => {
      setStartDate(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
  <DatePicker
    label="End Date"
    value={endDate}
    onChange={(newValue) => {
      setEndDate(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>

        
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
      <EmailDataTable
  selectedModule={modules[selectedModule].name}
  selectedKeys={selectedKeys}
  startDate={startDate}
  endDate={endDate}
/>
<ExplorerDataTable
  selectedModule={modules[selectedModule].name}
  selectedKeys={selectedKeys}
  startDate={startDate}
  endDate={endDate}
/>
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
