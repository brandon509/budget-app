const Amount = require("../models/Amount")

module.exports = {
    getAmounts: async (req,res) => {
        try {
            const amounts = Amount.find({ time: req.body.time })
            res.json({ amounts })
        } 
        catch (error) {
            console.log(error)
        }
    },
    addAmount: async (req,res) => {
        
    },
    editAmount: async (req,res) => {

    },
    deleteAmount: async (req,res) => {

    },
}