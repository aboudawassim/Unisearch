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
import moment from "moment";
import StorageIcon from "@mui/icons-material/Storage";

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
  "N_action",
  "Action",
  "CodeTypeAction",
  "CodeSourceAction",
  "REF_audit",
  "Cause",
  "Date",
  "Clôture",
  "CodeSite",
  "Matricule",
  "ActionNav",
  "NatureActionNav",
  "Commentaire",
  "RespSuivie",
  "DateSuivie",
  "TauxSuivie",
  "ISD",
  "DateSuiviePRV",
];

function createData(
  N_action,
  Action,
  CodeTypeAction,
  CodeSourceAction,
  REF_audit,
  Cause,
  Date,
  Clôture,
  CodeSite,
  Matricule,
  ActionNav,
  NatureActionNav,
  Commentaire,
  RespSuivie,
  DateSuivie,
  TauxSuivie,
  ISD,
  DateSuiviePRV
) {
  return {
    N_action,
    Action,
    CodeTypeAction,
    CodeSourceAction,
    REF_audit,
    Cause,
    Date,
    Clôture,
    CodeSite,
    Matricule,
    ActionNav,
    NatureActionNav,
    Commentaire,
    RespSuivie,
    DateSuivie,
    TauxSuivie,
    ISD,
    DateSuiviePRV,
  };
}

const rows = [
  createData(
    "1001",
    "Action",
    "500",
    "2",
    "1001",
    "cause",
    "2022-11-21T00:00:00.000Z",
    "Cloture",
    "600",
    "999",
    "Action nav",
    "Nature nav",
    "Doliprane",
    "1551",
    "2022-11-21T00:00:00.000Z",
    "5",
    "8",
    "2022-11-21T00:00:00.000Z"
  ),
];

function ActionDataTable({ query }) {
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
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.N_action}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.Action}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.CodeTypeAction}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.CodeSourceAction}
                </StyledTableCell>
                <StyledTableCell align="right">{row.REF_audit}</StyledTableCell>
                <StyledTableCell align="right">{row.Cause}</StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.Date).format("LL")}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Clôture}</StyledTableCell>
                <StyledTableCell align="right">{row.CodeSite}</StyledTableCell>
                <StyledTableCell align="right">{row.Matricule}</StyledTableCell>
                <StyledTableCell align="right">{row.ActionNav}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.NatureActionNav}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.Commentaire}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.RespSuivie}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.DateSuivie).format("LL")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.TauxSuivie}
                </StyledTableCell>
                <StyledTableCell align="right">{row.ISD}</StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.DateSuiviePRV).format("LL")}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ActionDataTable;
