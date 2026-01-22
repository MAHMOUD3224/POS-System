const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String, // Can be the MongoDB Order ObjectId or a custom Order ID
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
