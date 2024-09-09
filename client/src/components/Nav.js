import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from "react-icons/ai";

const Nav = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">E-commerce</Link>
      </p>
      <button type="button" className="cart-icon">
        <AiOutlineShopping />
        <span className="cart-item-qty absolute top-0">1</span>
      </button>
    </div>
  )
}

export default Nav