"use client"

import React, { useEffect, useState } from 'react'
import { Box, Typography } from "@mui/material";
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
    }, [dispatch])

    return (
        <Box className="flex flex-col gap-4">
            <Typography variant="h6">Order Details</Typography>
            <Typography>Order #{orderId}</Typography>
            <Typography>Amount: {order && `$${convertToPrice(order.amountTotal)}`}</Typography>
            {order?.items && (
                <table className="table-auto border-spacing-2 w-full">
                    <thead className="after:h-6 after:block text-left">
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th className="text-center">Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>${convertToPrice(item.price)}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td>${convertToPrice(item.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Box>
    )
}

export default OrderDetails