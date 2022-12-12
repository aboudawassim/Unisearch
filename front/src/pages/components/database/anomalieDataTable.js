import StorageIcon from "@mui/icons-material/Storage";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

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

const header = [
  "code",
  "date",
  "heure",
  "présentation",
  "description_ano",
  "correction",
];

function createData(
  code,
  date,
  heure,
  présentation,
  description_ano,
  correction
) {
  return {
    code,
    date,
    heure,
    présentation,
    description_ano,
    correction,
  };
}

const rows = [
  createData(
    "1001",
    "2022-11-21T00:00:00.000Z",
    "10:00",
    "Coucou la bie",
    "here is the desc",
    "anomalie doliprane",
    "fix it"
  ),
];

function AnomalieDataTable({ query }) {
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
      <Button
        variant="outlined"
        style={{ marginBottom: "10px" }}
        onClick={getResult}
        startIcon={<StorageIcon />}
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
            {/* code,date,heure,présentation,description_ano,correction */}
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.code}</StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.date).format("LL")}
                </StyledTableCell>
                <StyledTableCell align="right">{row.heure}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.présentation}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.description_ano}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.correction}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AnomalieDataTable;
