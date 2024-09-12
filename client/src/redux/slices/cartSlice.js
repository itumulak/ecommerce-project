import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        totalQty: 0,
        showCart: false
    },
    reducers: {
        addProduct: (state, action) => {
            const existingProduct = state.products.find(product => product._id === action.payload._id)

            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity || 1
            }
            else {
                state.products.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1
                })
            }

            state.totalQty += action.payload.quantity || 0
        },
        removeProduct: (state, action) => {
            state.totalQty -= state.products.find(product => product._id === action.payload).quantity
            state.products = state.products.filter(product => product._id !== action.payload)
        },
        updateQty: (state, action) => {
            const existingProduct = state.products.find(product => product._id === action.payload._id)

            if (existingProduct) {
                existingProduct.quantity = action.payload.quantity
                state.totalQty += action.payload.quantity - existingProduct.quantity
            }
        },

        toggleCart: (state, action) => {
            state.showCart = action.payload
        }
    }
})

export default cartSlice.reducer
export const { addProduct, removeProduct, updateQty, toggleCart } = cartSlice.actions