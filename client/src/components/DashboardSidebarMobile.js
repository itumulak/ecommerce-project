import React, { useState } from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import DashboardSidebar from './DashboardSidebar'

const DashboardSidebarMobile = ({userId, onCloseSidebar}) => {
    return (
        <div className="profile-sidebar-mobile-wrapper" style={{background: "rgba(0, 0, 0, 0.5)"}}>
            <div className="profile-sidebar-mobile-container pt-12">
                <button onClick={onCloseSidebar} className="z-10 absolute p-2 right-0 bg-red-300 rounded-l" style={{top: `${(0.1 * window.innerHeight) + 15}px`}}>
                    <KeyboardDoubleArrowLeftIcon />
                </button>
                <DashboardSidebar userId={userId}/>
            </div>
        </div>
    )
}

export default DashboardSidebarMobile