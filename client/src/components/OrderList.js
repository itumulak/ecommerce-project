"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import convertToPrice from '../util/convertToPrice';
import { getOrders } from '../redux/actions';

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
            <List>
            {orderList && orderList.map((order) => (
                <ListItem 
                className="hover:cursor-pointer" 
                button="true" 
                key={order._id} 
                onClick={() => router.push(`/profile/${order.userId}/orders/${order._id}`)}>
                    <ListItemText 
                    className="flex flex-row justify-between items-center gap-5" 
                    primary={`Order #${order._id}`} 
                    secondary={`$${convertToPrice(order.amountTotal)}`} 
                    />
                </ListItem>
            ))}
            </List>
        </Box>
    )
}

export default OrderList