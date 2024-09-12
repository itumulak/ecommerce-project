"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

import Cart from './Cart';
import { toggleCart } from '@/redux/slices/cartSlice';

const Nav = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart.products)
  const showCart = useSelector(state => state.cart.showCart)

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">E-commerce</Link>
      </p>
      <button type="button" className="cart-icon" onClick={() => dispatch(toggleCart(true))}>
        <AiOutlineShopping />
        <span className="cart-item-qty absolute top-0">{products.length || 0}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Nav