import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#213d89",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const header = ["Name", "path", "format", "content"];

function createData(Name, path, format, contenu) {
  return {
    Name,
    path,
    format,
    contenu,
  };
}

const rows = [
  createData(
    "myFile",
    "C:/users/wassim",
    "PDF",
    "Bonjour, J'ai besoin de DOLIPRANE"
  ),
];

function ExplorerDataTable({ query }) {
  const baseURL = `http://localhost:8000/search/db`;
  const [resultDB, setResultDB] = useState([]);
  const [loadingDB, setLoadingDB] = useState(false);

  function getResult() {
    setLoadingDB(true);
    axios
      .get(baseURL, {
        params: {
          key: query.replace(",", "|"),
        },
      })
      .then((response) => {
        setResultDB(response.data);
        setLoadingDB(false);
      })
      .catch((error) => {
        console.log("Error in getting DB result => ", error);
        setLoadingDB(false);
      });
  }

  if (!resultDB) return null;
  return (
    <div style={{ margin: "10px 10%" }}>
      {/* <Button
        variant="contained"
        style={{ width: "20%", marginBottom: "10px" }}
        onClick={getResult}
      >
        Load EMAIL Data ({resultDB.length})
      </Button> */}
      <Button
        variant="outlined"
        startIcon={<ContentPasteSearchIcon />}
        onClick={getResult}
        style={{ marginBottom: "10px" }}
      >
        Load data
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {header.map((header, index) => (
                <StyledTableCell
                  align={
                    index === 0
                      ? "left"
                      : index === header.length
                      ? "right"
                      : "center"
                  }
                >
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{row.Name}</StyledTableCell>
                <StyledTableCell align="center">{row.path}</StyledTableCell>
                <StyledTableCell align="center">{row.format}</StyledTableCell>
                <StyledTableCell align="center">{row.contenu}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExplorerDataTable;
