import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UsersTable = ({ users }) => {
  return (
    <TableContainer component={Paper} sx={{ minHeight: "300px", border: '.2rem solid' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow
              key={user.name + index}
              sx={{
                bgcolor: index % 2 ? "white" : "#eeeeee" 
              }}
            >
              <TableCell component="th" scope="row" sx={{ border: 1 }}>
                {user.name}
              </TableCell>
              <TableCell align="left">{user.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
