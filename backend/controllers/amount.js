const Amount = require("../models/Amount")

module.exports = {
    get: async (req,res) => {
        try {
            const { year, month } = req.query

            const amounts = await Amount.find({ dateIncurred: {$gte: new Date(year,month-1,1,-5,0,0), $lte: new Date(year,month-1,31)}, user: req.user.id }).populate('category')
            res.json(amounts)
        } 
        catch (error) {
            console.log(error)
        }
    },
    new: async (req,res) => {
        try {
            if(typeof req.body.amount != "number"){
                return res.status(401).json('amount not a valid number')
            }

            const amount = await Amount.create({
                description: req.body.description,
                amount: req.body.amount,
                adjAmount: req.body.adjAmount,
                category: req.body.category,
                dateIncurred: req.body.dateIncurred,
                user: req.user.id
            })

            res.json(amount)
        } 
        catch (error) {
            console.log(error)
        }
    },
    update: async (req,res) => {
        try {
            let changes = {}
            if(req.body.description){
                changes['description'] = req.body.description
            }
            if(req.body.amount && typeof req.body.dateIncurred === "number"){
                changes['amount'] = req.body.amount
            }
            if(req.body.adjAmount){
                changes['adjAmount'] = req.body.adjAmount
            }
            if(req.body.category){
                changes['category'] = req.body.category
            }
            if(req.body.dateIncurred){
                const { year, month, day } = req.body.dateIncurred
                changes['dateIncurred'] = new Date(year, month-1, day)
            }

            const amount = await Amount.findByIdAndUpdate(req.body.id, changes)
            res.status(200).json("line item updated")
        } 
        catch (error) {
            
        }
    },
    delete: async (req,res) => {
        try{
            const amount = await Amount.findByIdAndDelete(req.body.id)
            res.json('line item removed')
        }
        catch(error){
            console.log(error)
        }
    },
}