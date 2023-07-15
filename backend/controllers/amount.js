const Amount = require("../models/Amount")

module.exports = {
    getAmounts: async (req,res) => {
        try {
            const amounts = await Amount.find({ time: req.body.time, user: req.user.id }).populate('category')
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
                user: req.user.id
            })

            res.json(amount)
        } 
        catch (error) {
            console.log(error)
        }
    },
    editAmount: async (req,res) => {
        try {
            const amount = await Amount.findByIdAndUpdate(req.body.id, { actual: req.body.actual, estimate: req.body.estimate })
            res.json('amount updated')
        } 
        catch (error) {
            
        }
    },
    deleteAmount: async (req,res) => {

    },
}