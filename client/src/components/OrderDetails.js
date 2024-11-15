"use client"

import React, { useEffect, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';

import { getOrder } from '../redux/actions';
import convertToPrice from '../util/convertToPrice';

const OrderDetails = ({userId, orderId}) => {
    const dispatch = useDispatch()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        dispatch(getOrder({userId, orderId}))
            .then(data => {  
                              
                if ( ! data.error ) {
                    setOrder(data.payload.order)
                }
            })
    }, [dispatch, orderId, userId])

    return (
        <Box className="flex flex-col gap-4">
            <Typography variant="h6">Order Details</Typography>
            <Typography>Order #{orderId}</Typography>
            <Typography>Amount: {order && `$${convertToPrice(order.amountTotal)}`}</Typography>
            {order?.items && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {order?.items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>${convertToPrice(item.price)}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${convertToPrice(item.amount)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}

export default OrderDetails