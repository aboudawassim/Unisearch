import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../../helpers/axios";

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

const header = ["Fullname", "Username", "Rôle", "Created at", "Actions"];

// function createData(fullname, username, role, createdAt) {
//   return { fullname, username, role, createdAt };
// }

// const rows = [
//   createData(
//     "Wassim Abouda",
//     "wassimbr",
//     "ADMIN",
//     "2022-09-26T18:09:51.295+00:00"
//   ),
//   createData(
//     "Houcem Sanai",
//     "Hsanai",
//     "Responsable Qualité",
//     "2022-09-26T18:09:51.295+00:00"
//   ),
// ];

function UsersDataTable({ query, editUser, users, deleteUser }) {
  /* const baseURL = `http://localhost:8000/search/db`;
  const [resultDB, setResultDB] = useState([]);
  const [loadingDB, setLoadingDB] = useState(false);

 function getUsers() {
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
  }*/

  if (!users) return null;
  return (
    <div>
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
            {users.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center" scope="row">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell align="center">{row.roles[0]}</StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.createdAt).format("LL")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => editUser(row)}>
                    <EditIcon style={{ color: "blue" }} />
                  </Button>
                  <Button onClick={() => deleteUser(row.id)}>
                    <DeleteIcon style={{ color: "red" }} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersDataTable;
