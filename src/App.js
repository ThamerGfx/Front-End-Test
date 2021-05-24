/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function App() {
  const classes = useStyles();

  /// State to open and close the liste of the other details
  const [open, setOpen] = useState(true);

  /// Click function to change the state value (open)
  const handleClick = () => {
    setOpen(!open);
  };

  /// State to put the random user details
  const [dataToFetch, setDataToFetch] = useState({});

  /// Get random user function from the api
  const getRandomUser = () => {
    fetch('https://randomuser.me/api')
    .then((res) => {
        return res.json()
    }).then((data) => {
        setDataToFetch(data.results[0])
    })
  } 
 
  /// useEffect to dispatch the getRandomUser function 
  useEffect(() => {
    getRandomUser()
  }, []);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">First Name</StyledTableCell>
                <StyledTableCell align="left">Last Name</StyledTableCell>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={dataToFetch.id}>
              <StyledTableCell align="left">{dataToFetch.name.first}</StyledTableCell>
              <StyledTableCell align="left">{dataToFetch.name.last}</StyledTableCell>
              <StyledTableCell align="left"><img src={dataToFetch.picture.thumbnail}/></StyledTableCell>
              <StyledTableCell align="left">
                <List>
                  <ListItem button onClick={handleClick}>
                    {open ? 
                    (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                      >
                        Click to close
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                      >
                        Click to open
                      </Button>
                    )
                    }
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <TableContainer component={Paper}>
                          <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  Gender
                                </TableCell>
                                <TableCell align="right">{dataToFetch.gender}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  Street
                                </TableCell>
                                <TableCell align="right">{dataToFetch.location.street.number} {' '} {dataToFetch.location.street.name}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  City
                                </TableCell>
                                <TableCell align="right">{dataToFetch.location.city}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  State
                                </TableCell>
                                <TableCell align="right">{dataToFetch.location.state}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  Country
                                </TableCell>
                                <TableCell align="right">{dataToFetch.location.country}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  Post-Code
                                </TableCell>
                                <TableCell align="right">{dataToFetch.location.postcode}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  Email
                                </TableCell>
                                <TableCell align="right">{dataToFetch.email}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  Username
                                </TableCell>
                                <TableCell align="right">{dataToFetch.login.username}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  Phone
                                </TableCell>
                                <TableCell align="right">{dataToFetch.phone}</TableCell>
                              </TableRow>
                              <TableRow key={dataToFetch.id}>
                                <TableCell component="th" scope="row">
                                  Cell
                                </TableCell>
                                <TableCell align="right">{dataToFetch.cell}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
      </Table>
    </TableContainer>
  );
}
