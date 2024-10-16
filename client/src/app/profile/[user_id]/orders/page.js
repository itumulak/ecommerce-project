"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import convertToPrice from '../../../../util/convertToPrice';
import { getOrders } from '../../../../redux/actions';
import DashboardSidebar from '../../../../components/DashboardSidebar';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import Protected from '../../../../components/Protected';
import DashboardSidebarMobile from '../../../../components/DashboardSidebarMobile';

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
      <Protected/>
      <DashboardSidebarMobile userId={user_id} />
      <div className="w-12">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <div className="flex flex-row gap-6">
        <div className="hidden lg:block lg:w-3/12">
          <DashboardSidebar userId={user_id} />
        </div>
        <div className="wp-12/12 lg:w-9/12">
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
        </div>
      </div>
    </div>
  )
}

export default page