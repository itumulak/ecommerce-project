import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    amountTotal: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('Order', orderSchema)