"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

import Cart from './Cart';
import { toggleCart } from '@/redux/slices/cartSlice';

const Nav = () => {
  const products = useSelector(state => state.cart.products)
  const [showCart, setShowCart] = useState(false)
  

  const handleToggle = () => {
    setShowCart(!showCart)
  }
  
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">E-commerce</Link>
      </p>
      <button 
        className="cart-icon" 
        onClick={handleToggle}
      >
        <AiOutlineShopping />
      </button>

      {showCart && <Cart handleToggle={handleToggle} />}
    </div>
  )
}

export default Nav