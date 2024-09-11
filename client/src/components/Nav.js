"use client"

import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from "react-icons/ai";
import { useSelector } from 'react-redux';

const Nav = () => {
  const products = useSelector(state => state.cart.products)

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">E-commerce</Link>
      </p>
      <button type="button" className="cart-icon">
        <AiOutlineShopping />
        <span className="cart-item-qty absolute top-0">{products.length || 0}</span>
      </button>
    </div>
  )
}

export default Nav