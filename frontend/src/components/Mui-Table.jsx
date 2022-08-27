import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { Fragment, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";

import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";

let Users = [],
  Statuses = ["Actived", "Pending", "Blocked"];
for (let i = 0; i < 50; i++) {
  Users[i] = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.bsBuzz(),
    joinDate: JSON.stringify(faker.date.birthdate()),
    status: Statuses[Math.floor(Math.random() * Statuses.length)],
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

const MuiTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" colSpan={3}>
                  Country
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={5}>
                  Details
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="right">Phone</StyledTableCell>
                <StyledTableCell align="right">Job Title</StyledTableCell>
                <StyledTableCell align="right">Company</StyledTableCell>
                <StyledTableCell align="right">Join Date</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="left" sx={{ minHeight: 150 }}>
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Users.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row) => {
                return (
                  <StyledTableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 5 }}>
                      {row.email}
                    </TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.jobTitle}</TableCell>
                    <TableCell align="right">{row.company}</TableCell>
                    <TableCell align="right">{row.joinDate}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell
                      size="small"
                      justify="flex-end"
                      align="justify"
                      sx={{ width: 175 }}
                    >
                      <Link to={"/edit"}>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                        >
                          {<DeleteIcon fontSize="9" />}
                        </Button>
                        &nbsp;
                      </Link>
                      <Button size="small" color="success" variant="contained">
                        {<RemoveRedEye fontSize="9" />}
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={Users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
  );
};

export default MuiTable;
