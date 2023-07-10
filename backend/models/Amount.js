const mongoose = require("mongoose")

const AmountSchema = new mongoose.Schema({
    actual: {
        type: Number,
        required: true
    },
    estimate: {
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Amount", AmountSchema)