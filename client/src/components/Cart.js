"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { AiOutlineLeft, AiOutlineDelete } from 'react-icons/ai'

import { removeProduct, toggleCart, updateQty } from '../redux/slices/cartSlice'
import { urlFor } from '../lib/client'
import Qty from './Qty'

const Cart = ({handleToggle}) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.products)
  const subTotal = useSelector(state => state.cart.total)

  const handleRemoveItem = (id) => {
    dispatch(removeProduct(id))
  }

  const handleUpdateQty = (id, qty) => {
    dispatch(updateQty({id, quantity: qty}))
  }
  
  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <div className="flex flex-row justify-between items-center">
          <button className="cart-heading" onClick={handleToggle}>
            <AiOutlineLeft/>
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">({cartItems.length}) items</span>
          </button>
          <Link href="/cart" className="mr-[10px]">
            <button className="font-semibold text-lg" onClick={handleToggle}>View Cart</button>
          </Link>
        </div>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <Link href="/">
              <button type="button" className="btn" onClick={handleToggle}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="flex flex-col justify-between h-full">
            <div className="product-container">
              {cartItems?.map(item => (
                <div className="product" key={item._id}>
                  <img src={urlFor(item?.image[0])} className="cart-product-image" />
                  <div className="w-full flex flex-col gap-y-4">
                    <div className="flex flex-row justify-between font-bold">
                      <h5>{item.title}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex flex-row justify-between gap-x-4">
                      <div className="flex flex-row items-center gap-x-4">
                        Qty: <Qty quantity={item.quantity} setQuantity={(qty) => handleUpdateQty(item._id, qty)} />
                      </div>
                      <button type="button" className="remove-item" onClick={() => handleRemoveItem(item._id)}>
                        <AiOutlineDelete/>
                      </button>
                    </div>
                  </div>                  
                </div>
              ))}
            </div>
            <div className="cart-summary border-t border-x-gray-300 py-4 px-6 flex flex-col gap-y-4">
              <div className="flex flex-row justify-between font-bold">
                <span className="uppercase">Subtotal:</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <button className="w-full text-center bg-[#f02d34] text-white py-2 text-lg">Checkout</button>
              </Link>              
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart