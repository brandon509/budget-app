const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true,
    },
    budget: {
        type: Map,
        of: Number,
        required: true,
    },
    joint: {
        type: Boolean,
        default: false,
    },
    split: {
        type: Number,
        default: 1,
        min: 0.01,
        max: 1,
    },
    active: {
        type: Boolean,
        default: false,
    },
    deletedTime: {
        type: Date
    }
}, { timestamps: true })

module.exports = mongoose.model("Category", CategorySchema)