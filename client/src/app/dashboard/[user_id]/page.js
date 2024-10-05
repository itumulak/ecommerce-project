"use client"

import React from 'react';

import PersonalInfo from '../../../components/PersonalInfo';
import DashboardSidebar from '../../../components/DashboardSidebar';

export default function Page({ params: { user_id } }) {  
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
            <PersonalInfo />
          </div>
        </div>
      </div>
    )
  }