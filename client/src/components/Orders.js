import React from 'react'
import { Box, ListItem, ListItemText, Typography } from "@mui/material";

import convertToPrice from "../util/convertToPrice";
import { useRouter } from 'next/navigation';


const Orders = ({orders}) => {
  const router = useRouter()

  return (
    <Box>
        <Typography variant="h6">My Orders</Typography>
        {orders && orders.map((order) => (
            <ListItem button="true" key={order._id} onClick={() => router.push(`/dashboard/${order.userId}/order/${order._id}`)}>
                <ListItemText className="flex flex-row justify-between" primary={`Order #${order._id}`} secondary={`$${convertToPrice(order.amountTotal)}`} />
            </ListItem>
          ))}
    </Box>
  )
}

export default Orders