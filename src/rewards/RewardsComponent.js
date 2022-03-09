import React, { useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

function RenderCustomerTable(customers) {
    // console.log(customers.customers)
    const finalRewards =combineCustomerForMonth(customers)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Purchase Month</TableCell>
                        <TableCell align="right">Total Amount Spent</TableCell>
                        <TableCell align="right">Total Rewards Earned</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers && customers.customers && customers.customers.map(function (customer) {
                        return (
                            <TableRow
                                // key={customer.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {customer.id}
                                </TableCell>
                                <TableCell alight="center">{customer.first_name + " " + customer.last_name} </TableCell>
                                <TableCell alight="center">{customer.date} </TableCell>
                                <TableCell alight="center">{customer.purchase_amount} </TableCell>
                                <TableCell alight="center">{calculateRewards(customer.purchase_amount)} </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function calculateRewards(price) {
    if(price >= 50 && price < 100) {
        return price - 50
    } else if(price >= 100) {
        return (2*(price-100) + 50);
    } else {
        return 0
    }
}

function combineCustomerForMonth(customers) {
    var outputDict = {}
    customers && customers.customers && customers.customers.map(function(customer) {
        let date = new Date(customer.date)
        let longMonth = date.toLocaleString('en-us', { month: 'long' }); 
        if(!outputDict[customer.id]) {
            outputDict[customer.id] = []
        }
        if(outputDict[customer.id][longMonth]) {
            outputDict[customer.id][longMonth].rewards += calculateRewards(customer.purchase_amount)
            outputDict[customer.id][longMonth].numberOfTransaction ++
            outputDict[customer.id][longMonth].totalAmountSpent += customer.purchase_amount
        } else {
            outputDict[customer.id][longMonth] = {
                'name': customer.first_name + " " + customer.last_name,
                'id': customer.id,
                'numberOfTransaction': 1,
                'rewards': calculateRewards(customer.purchase_amount),
                'totalAmountSpent': customer.purchase_amount
            }
        }
      })
      console.log(outputDict)
      return outputDict;
  }

function RewardsComponent(props) {

    useEffect(() => {
        props.fetchCustomers()
    }, []);

    return (
        <div>
            {props.loading == true ? (
                <CircularProgress />
            ) : (
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}
                    >

                        <Grid item xs={3}>
                            {RenderCustomerTable(props.customers)}
                        </Grid>

                    </Grid>
                )
            }
        </div>
    )
}

export default RewardsComponent;