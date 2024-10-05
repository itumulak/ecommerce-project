"use client"

import React, { useEffect, useState } from 'react'
import { Box, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';

import { getOrder } from '../../../../../redux/actions';
import convertToPrice from '../../../../../util/convertToPrice';
import DashboardSidebar from '../../../../../components/DashboardSidebar'

const page = ({ params: { order_id, user_id }}) => {
    const dispatch = useDispatch()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        dispatch(getOrder({userId: user_id, orderId: order_id}))
            .then(data => {  
                              
                if ( ! data.error ) {
                    setOrder(data.payload.order)
                }
            })
    }, [dispatch])

    return (
        <div className="flex flex-col gap-4 px-12">
            <div className="w-12">
                <h2 className="text-2xl font-bold">Dashboard</h2>
            </div>
            <div className="flex flex-row gap-6">
                <div className="w-3/12">
                    <DashboardSidebar userId={user_id} />
                </div>
                <div className="w-9/12">
                    <Box className="flex flex-col gap-4">
                        <Typography variant="h6">Order Details</Typography>
                        <Typography>Order #{order_id}</Typography>
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
                </div>
            </div>            
        </div>
    )
}

export default page