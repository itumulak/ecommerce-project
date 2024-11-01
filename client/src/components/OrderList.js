"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Box, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import convertToPrice from '../util/convertToPrice';
import { getOrders } from '../redux/actions';
import Link from 'next/link';

const OrderList = ({userId}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        dispatch(getOrders({ userId }))
            .then((respond) => {
                if (!respond.error) {
                    setOrderList(respond.payload.orders);
                }        
            })
    }, [])

    return (
        <Box>
            <Typography variant="h6">My Orders</Typography>
            <TableContainer className="mt-4" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Amount Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList && orderList.map((order) => (
                            <TableRow className="hover:cursor-pointer" key={order._id} onClick={() => router.push(`/profile/${order.userId}/orders/${order._id}`)}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{convertToPrice(order.amountTotal)}</TableCell>
                                <TableCell>
                                    <Link href={`/profile/${order.userId}/orders/${order._id}`}>
                                        <ArrowForwardIosIcon/>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default OrderList