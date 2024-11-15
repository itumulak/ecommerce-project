"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { urlFor } from '../lib/sanityClient'
import { removeProduct, updateQty } from '../redux/slices/cartSlice'
import { AiOutlineDelete } from 'react-icons/ai'
import Link from 'next/link'
import Image from 'next/image'

import Qty from './Qty'

const CartList = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart.products)
  const total = useSelector(state => state.cart.total)


  const handleProductQtyUpdate = (id, qty) => {
    dispatch(updateQty({id, quantity: qty}))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeProduct(id))
  }

  return (
    products.length > 0 ? (
        <>
          <table className="table-auto w-2/3 border-spacing-4">
            <thead className="after:h-6 after:block">
              <tr className="text-left">
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex flex-row items-center gap-6">
                      <Image width={60} height={60} src={urlFor(product.image[0]).url()} alt={product.title} />
                      <span className="font-bold">{product.title}</span>
                    </div>
                  </td>
                  <td>{product.price}</td>
                  <td>
                    <div className="flex flex-row items-center gap-4">
                      <Qty quantity={product.quantity} setQuantity={(qty) => handleProductQtyUpdate(product._id, qty)}/>
                      <button className="remove-item mr-auto" onClick={() => handleRemoveItem(product._id)}>
                        <AiOutlineDelete/>
                      </button>
                    </div>
                  </td>
                  <td>{(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col gap-y-4 px-6 py-8 w-1/3 border-2 border-gray-500 rounded">
            <h3 className="text-lg font-bold">Cart Totals</h3>
            <p className="flex flex-row items-center justify-between">
              <span>Delivery Charge</span>
              <span>$0</span>
            </p>
            <p className="flex flex-row items-center justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </p>
            <Link href="/checkout">
              <button className="bg-[#f02d34] text-white text-lg py-2 text-center w-full rounded">Checkout</button>
            </Link>
          </div>
        </>
      ): (
        <p>No products in cart</p>
      )
  )
}

export default CartList