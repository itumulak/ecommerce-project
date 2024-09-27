"use client"

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from '../redux/slices/cartSlice';
import Qty from './Qty';

const ProductQty = ({data}) => {
    const dispatch = useDispatch()
    const productQty = useSelector(state => state.cart.products.find(product => {
        if (product._id === data._id) {
            return product.quantity
        }
        
        return 1
    }))
    const [quantity, setQuantity] = useState(1)
    
    const handleAddToCart = () => {
        dispatch(addProduct({ ...data, quantity }))        
    }

    const handleQuantityUpdate = (qty) => {
        setQuantity(qty)
    }

    return (
        <div className="quantity">
            <h3>Quantity:</h3>
            <Qty quantity={quantity} setQuantity={handleQuantityUpdate}/>
            <div className="buttons">
                <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                <button className="buy-now">Buy Now</button>
            </div>
        </div>
    )
}

export default ProductQty