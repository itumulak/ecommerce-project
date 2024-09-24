import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        total: 0
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

            state.total = computeSubtotal(state.products)
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
            state.total = computeSubtotal(state.products)
        },
        updateQty: (state, action) => {
            const updatedProducts = []

            state.products.forEach(product => {
                if (product._id === action.payload.id) {
                    updatedProducts.push({
                        ...product,
                        quantity: action.payload.quantity
                    })
                } else {
                    updatedProducts.push(product)
                }
            })  
            state.products = updatedProducts   
            state.total = computeSubtotal(state.products) 
        }
    }
})

const computeSubtotal = (products) => {
    return products.reduce((acc, product) => {
        console.log(product);        
        return acc + (product.price * product.quantity)
    }, 0)
}

export default cartSlice.reducer
export const { addProduct, removeProduct, updateQty } = cartSlice.actions