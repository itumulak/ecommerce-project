"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'

import { removeProduct, toggleCart, updateQty } from '@/redux/slices/cartSlice'
import { urlFor } from '@/lib/client'

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.products)
  const totalQty = useSelector(state => state.cart.totalQty)

  const handleChangeQty = (type, id) => {
    cartItems.find(item => {
      let qty = item.quantity; 

      if (item._id === id) {
        if (type === "inc") {
          qty += 1        
        } else if (type === "dec") {
          if (item.quantity - 1 < 1) {
            qty = 1
          }
          else {
            qty -= 1
          }
        }
      }

      dispatch(updateQty({ _id: id, quantity: qty }))
    })
  }

  const handleRemoveItem = (id) => {
    dispatch(removeProduct(id))
  }
  
  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button className="cart-heading" onClick={() => dispatch(toggleCart(false))}>
          <AiOutlineLeft/>
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQty}) items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <Link href="/">
              <button type="button" className="btn" onClick={() => dispatch(toggleCart(false))}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className='product-container'>
            {cartItems?.map(item => (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} className="cart-product-image" />
                <div className="">
                  <div className="flex top"></div>
                    <h5>{item.title}</h5>
                    <h4>${item.price}</h4>
                    <div className="flex flex-row gap-x-4">
                      <div>
                        <p className="quantity-desc flex flex-row items-center">
                            <span onClick={() => handleChangeQty("dec", item._id)} className="text-red-600"><AiOutlineMinus /></span>
                            <span className="font-semibold">{item.quantity}</span>
                            <span onClick={() => handleChangeQty("inc", item._id)} className="text-green-500"><AiOutlinePlus /></span>
                        </p>
                      </div>
                      <button type="button" className="remove-item" onClick={() => handleRemoveItem(item._id)}>
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>                  
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart