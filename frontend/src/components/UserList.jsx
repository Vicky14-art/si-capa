import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';
import { IoBrush, IoTrashSharp, IoAddOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";

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
    backgroundColor: theme.palette.primary.dark,
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

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getUsers();
  }, [search]);

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/users?search=${search}`
    );
    setUsers(response.data);
    // console.log(response);
  };

  const deleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/users/${userId}`);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
      getUsers();
    });
  };
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">LIST Users</h2>
          <br />
          <br />
          <Button
            color="warning"
            size="small"
            startIcon={<Add fontSize="9" />}
            variant="contained"
          >
            Tambah User Baru
          </Button>
        </div>
        {/* /.card-header */}
        <div className="card-body">
          <form onSubmit={getUsers}>
            <div className="input-group input-group-sm mb-2">
              <input
                type="text"
                placeholder="Search Name or Email Here"
                className="bg-white form-control"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
              />
              <span className="input-group-append">
              </span>
            </div>
          </form>
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <caption>
                  List User Terdaftar Pada System Electronic Capa Controller
                </caption>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" colSpan={5}>
                      Details
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Role</StyledTableCell>
                    <StyledTableCell align="center">Departement</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <StyledTableRow
                          key={row.uuid}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="center" sx={{ minWidth: 5 }}>
                            {row.email}
                          </TableCell>
                          <TableCell align="center">{row.role}</TableCell>
                          <TableCell align="center">{row.dpt.name}</TableCell>
                          <TableCell
                            size="small"
                            justify="flex-end"
                            align="center"
                            sx={{ width: 175 }}
                          >
                            <Link to={`/users/edit/${row.uuid}`}>
                              <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                              >
                                {<Edit fontSize="9" />}
                              </Button>
                              &nbsp;
                            </Link>
                            <Button
                              onClick={(e) => {
                                deleteUser(row.uuid);
                              }}
                              size="small"
                              color="success"
                              variant="contained"
                            >
                              {<DeleteIcon fontSize="9" />}
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
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
        {/* /.card-body */}
      </div>
    </Fragment>
  );
};

export default UserList;
