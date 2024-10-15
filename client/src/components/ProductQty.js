"use client"

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from "styled-components";

import { addProduct } from '../redux/slices/cartSlice';
import Qty from './Qty';

const ButtonsWrapper = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
        "qtylabel quantity addtocart"
        "nouse buynow buynow";

    .quantity {
        grid-area: quantity;
    }

    .add-to-cart {
        grid-area: addtocart;
    }

    .buy-now {
        grid-area: buynow;
    }
`

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
            <div className="flex flex-row items-baseline gap-4">
                <ButtonsWrapper className="buttons">
                    <h3 className="qtylabel pt-2">Quantity:</h3>
                    <Qty quantity={quantity} setQuantity={handleQuantityUpdate}/>
                    <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                    <button className="buy-now !w-[100%]">Buy Now</button>
                </ButtonsWrapper>
            </div>
           
        </div>
    )
}

export default ProductQty