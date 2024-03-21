const Amount = require("../models/Amount")

module.exports = {
    get: async (req,res) => {
        try {
            const { year, month } = req.query

            const daysInMonth = new Date(year,+month+1,0).getDate()

            const amounts = await Amount.find({ dateIncurred: {$gte: new Date(year,month,1,-5,0,0), $lte: new Date(year,month,daysInMonth)}, user: req.user.id }).sort({ dateIncurred: -1 }).populate('category')
            
            res.json({ amounts })
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

            const newAmount = await Amount.findById(amount._id).populate('category')

            res.json(newAmount)
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
            if(req.body.amount){
                changes['amount'] = req.body.amount
            }
            if(req.body.adjAmount){
                changes['adjAmount'] = req.body.adjAmount
            }
            if(req.body.category){
                changes['category'] = req.body.category
            }
            if(req.body.dateIncurred){
                changes['dateIncurred'] = req.body.dateIncurred
            }

            const amount = await Amount.findByIdAndUpdate(req.body.id, changes)
            const updatedAmount = await Amount.findById(req.body.id).populate('category')
            
            res.status(200).json(updatedAmount)
        } 
        catch (error) {
            
        }
    },
    delete: async (req,res) => {
        try{
            const amount = await Amount.findByIdAndDelete(req.query.id)
            res.status(200).json(req.query.id)
        }
        catch(error){
            console.log(error)
        }
    },
}