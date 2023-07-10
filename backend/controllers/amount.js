const Amount = require("../models/Amount")

module.exports = {
    getAmounts: async (req,res) => {
        try {
            const amounts = await Amount.find({ time: req.body.time, user: req.body.user })
            res.json({ amounts })
        } 
        catch (error) {
            console.log(error)
        }
    },
    addAmount: async (req,res) => {
        try {
            let amount = await Amount.create({
                actual: req.body.actual,
                estimate: req.body.estimate,
                category: req.body.category,
                time: req.body.time,
                user: req.body.user
            })

            res.json(amount)
        } 
        catch (error) {
            console.log(error)
        }
    },
    editAmount: async (req,res) => {

    },
    deleteAmount: async (req,res) => {

    },
}