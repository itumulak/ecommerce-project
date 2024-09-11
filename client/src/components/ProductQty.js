"use client"

import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import { addProduct } from '@/redux/slices/cartSlice';

const ProductQty = ({data: {_id, title, price}}) => {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    const decreaseQty = () => {
        setQty(prevQty => {
            if (prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    const increaseQty = () => {
        setQty(prevQty => prevQty + 1)
    }

    const handleAddToCart = () => {
        dispatch(addProduct({ _id, title, price, quantity: qty }))
        console.log("added to cart");
    }

    return (
        <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc flex flex-row items-center">
                <span onClick={decreaseQty} className="text-red-600"><AiOutlineMinus /></span>
                <span className="font-semibold">{qty}</span>
                <span onClick={increaseQty} className="text-green-500"><AiOutlinePlus /></span>
            </p>
            <div className="buttons">
                <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                <button className="buy-now">Buy Now</button>
            </div>
        </div>
    )
}

export default ProductQty