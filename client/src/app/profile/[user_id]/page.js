"use client"

import React, { useState } from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import PersonalInfo from '../../../components/PersonalInfo';
import DashboardSidebar from '../../../components/DashboardSidebar';
import Protected from '../../../components/Protected'
import DashboardSidebarMobile from '../../../components/DashboardSidebarMobile';

export default function Page({ params: { user_id } }) {  
    const [showMobileSidebar, setShowMobileSidebar] = useState(false)

    const handleShowMobileSidebar = () => {
      setShowMobileSidebar(!showMobileSidebar)
    }

    return (
      <div className="flex flex-col gap-4 px-12">
        <Protected />
        <button className="absolute p-2 left-0 bg-red-300 rounded-r" style={{top: `${(0.1 * window.innerHeight) + 15}px`}} onClick={handleShowMobileSidebar}>
            <KeyboardDoubleArrowRightIcon/>
        </button>
        {showMobileSidebar && <DashboardSidebarMobile onCloseSidebar={handleShowMobileSidebar} userId={user_id} />}
        <div className="w-12">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <div className="flex flex-row gap-6">
          <div className="hidden lg:block lg:w-3/12">
            <DashboardSidebar userId={user_id} />
          </div>
          <div className="w-12/12 lg:w-9/12">
            <PersonalInfo />
          </div>
        </div>
      </div>
    )
  }