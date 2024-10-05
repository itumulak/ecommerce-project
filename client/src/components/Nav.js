"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

import Cart from './Cart';
import { revalidateToken } from '../redux/actions';


const Nav = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isLogin = useSelector(state => state.auth.isLogin)
  const products = useSelector(state => state.cart.products)
  const [showCart, setShowCart] = useState(false)  
  
  const handleToggle = () => {
    setShowCart(!showCart)
  }

  useEffect(() => {
    dispatch(revalidateToken())
  }, [])
  
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">E-commerce</Link>
      </p>
      <ul className="flex flex-row gap-x-8">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          {isLogin ? <Link href={`/dashboard/${user?.uid}`}>Dashboard</Link> : <Link href="/login">Login</Link>}
        </li>
        <li>
          <button 
            className="cart-icon flex flex-row" 
            onClick={handleToggle}
          >
            <AiOutlineShopping fill={`#f02d34`} />
            <span className="cart-item-qty">{products.length || 0}</span>
          </button>
        </li>
      </ul>

      {showCart && <Cart handleToggle={handleToggle} />}
    </div>
  )
}

export default Nav