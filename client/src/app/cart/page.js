import CartList from '@/components/CartList'
import React from 'react'

const cart = () => {

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Cart</h2>
      <div className="flex flex-row items-start">
        <CartList />
      </div>
    </div>
  )
}

export default cart