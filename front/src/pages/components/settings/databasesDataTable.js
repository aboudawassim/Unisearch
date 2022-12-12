import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  "Dialect",
  "Database",
  "Host",
  "username",
  "password",
  "port",
  "Actions",
];

function DatabasesDataTable({
  query,
  databases,
  deleteDatabase,
  setEditingDatabase,
}) {
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
                      : index !== header.length - 1
                      ? "center"
                      : "right"
                  }
                >
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {databases.map((database, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th">
                  {database.dialect}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {database.database}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {database.host}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {database.username}
                </StyledTableCell>
                <StyledTableCell align="center">**************</StyledTableCell>
                <StyledTableCell align="center">
                  {database.port}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => setEditingDatabase(database)}>
                    <EditIcon style={{ color: "blue" }} />
                  </Button>
                  <Button onClick={() => deleteDatabase(database.id)}>
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

export default DatabasesDataTable;
