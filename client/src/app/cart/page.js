import dynamic from 'next/dynamic'
import React from 'react'

const NoSSR = dynamic(() => import('../../components/CartList'), { ssr: false })

const cart = () => {

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Cart</h2>
      <div className="flex flex-row items-start">
        <NoSSR />
      </div>
    </div>
  )
}

export default cart