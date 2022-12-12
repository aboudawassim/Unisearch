import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { React } from "react";
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

const header = ["Role", "Description", "permissions", "Actions"];

function createData(role, description, permissions) {
  return { role, description, permissions };
}

const rows = [
  createData(
    "ResponsableMQ",
    "Responsable Management Qualité",
    "Product.view | Product.edit"
  ),
  createData(
    "ResponsableCQ",
    "Responsable contrôle Qualité",
    "Product.view | Product.edit"
  ),
  createData(
    "ResponsableCOND",
    "Responsable Conditionnement",
    "Product.view | Product.edit"
  ),
  createData(
    "ResponsablePROD",
    "Responsable Production",
    "Product.view | Product.edit"
  ),
  createData("PRT", "Pharmacien", "Product.view | Product.edit"),
];

function RolesDataTable({ roles, editRole, deleteRole }) {
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
            {roles.map((role, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th">{role.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {role.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {role.permissions
                      .map((item) => (item ? item.name : ""))
                      .join(" | ")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => editRole(role)}>
                      <EditIcon style={{ color: "blue" }} />
                    </Button>
                    <Button onClick={() => deleteRole(role.id)}>
                      <DeleteIcon style={{ color: "red" }} />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RolesDataTable;
