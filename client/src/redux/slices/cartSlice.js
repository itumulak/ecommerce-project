import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: []
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
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
        }
    }
})

export default cartSlice.reducer
export const { addProduct, removeProduct } = cartSlice.actions