"use client"
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Qty = ({quantity, setQuantity}) => {
    let qty = quantity    

    const handleChangeQuantity = (type) => {
        if (type === "inc") {
            qty = qty + 1
            setQuantity(qty)
        } else if (type === "dec") {
            if (qty - 1 < 1) {
                qty = 1
                setQuantity(qty)
            }
            else {
                qty = qty - 1
                setQuantity(qty)
            }
        }        
    }

    return (
        <p className="quantity-desc flex flex-row items-center w-max">
            <span onClick={() => handleChangeQuantity("dec")} className="text-red-600"><AiOutlineMinus /></span>
            <span className="font-semibold">{quantity}</span>
            <span onClick={() => handleChangeQuantity("inc")} className="text-green-500"><AiOutlinePlus /></span>
        </p>
    )
}

export default Qty