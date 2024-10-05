"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import convertToPrice from '../../../../util/convertToPrice';
import { getOrders } from '../../../../redux/actions';
import DashboardSidebar from '../../../../components/DashboardSidebar';
import { Box, ListItem, ListItemText, Typography } from '@mui/material';

const page = ({ params: { user_id }}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    dispatch(getOrders({ user_id })).then((respond) => {
      if (!respond.error) {
        setOrderList(respond.payload.orders);
      }        
    })
  }, [])

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
          <Box>
              <Typography variant="h6">My Orders</Typography>
              {orderList && orderList.map((order) => (
                <ListItem className="hover:cursor-pointer" button="true" key={order._id} onClick={() => router.push(`/dashboard/${order.userId}/orders/${order._id}`)}>
                    <ListItemText className="flex flex-row justify-between" primary={`Order #${order._id}`} secondary={`$${convertToPrice(order.amountTotal)}`} />
                </ListItem>
              ))}
          </Box>
        </div>
      </div>
    </div>
  )
}

export default page