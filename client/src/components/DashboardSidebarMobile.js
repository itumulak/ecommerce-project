"use client"

import React, { useState } from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import DashboardSidebar from './DashboardSidebar'

const DashboardSidebarMobile = ({userId}) => {
    const [mobileSidebar, setMobileSidebar] = useState(false)

    const handleShowMobileSidebar = () => {
      setMobileSidebar(true)
    }

    const handleCloseMobileSidebar = () => {
      setMobileSidebar(false)
    }

    return (
        <div className="block lg:hidden">
            <button className="absolute p-2 left-0 bg-red-300 rounded-r" style={{top: `${(0.1 * window.innerHeight) + 15}px`}} onClick={handleShowMobileSidebar}>
                <KeyboardDoubleArrowRightIcon/>
            </button>
            {mobileSidebar && (
                <div className="profile-sidebar-mobile-wrapper" style={{background: "rgba(0, 0, 0, 0.5)"}}>
                    <div className="profile-sidebar-mobile-container pt-12">
                        <button onClick={handleCloseMobileSidebar} className="z-10 absolute p-2 right-0 bg-red-300 rounded-l" style={{top: `${(0.1 * window.innerHeight) + 15}px`}}>
                            <KeyboardDoubleArrowLeftIcon />
                        </button>
                        <DashboardSidebar userId={userId}/>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default DashboardSidebarMobile