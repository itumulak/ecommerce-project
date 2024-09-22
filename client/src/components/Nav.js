"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

import Cart from './Cart';

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
        className="cart-icon flex flex-row" 
        onClick={handleToggle}
      >
        <AiOutlineShopping fill={`#f02d34`} />
        <span className="cart-item-qty">{products.length || 0}</span>
      </button>

      {showCart && <Cart handleToggle={handleToggle} />}
    </div>
  )
}

export default Nav