import React from 'react'

import DashboardSidebar from '../../../../../components/DashboardSidebar'
import Protected from '../../../../../components/Protected'
import DashboardSidebarMobile from '../../../../../components/DashboardSidebarMobile';
import OrderDetails from '../../../../../components/OrderDetails';

const page = ({ params: { order_id, user_id }}) => {

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
                    <OrderDetails userId={user_id} orderId={order_id} />
                </div>
            </div>            
        </div>
    )
}

export default page