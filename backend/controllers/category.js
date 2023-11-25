const Category = require("../models/Category")
const validator = require("validator")

module.exports = {
    get: async (req,res) => {
        try {
            let categories = await Category.find({ user: req.user.id, active: true })
            res.status(200).json(categories)
        } catch (error) {
            console.log(error)
        }
    },
    new: async (req,res) => {
        try {
            let category = await Category.create({
                name: req.body.name,
                budget: req.body.budget,
                user: req.user.id,
                split: req.body.split
            })

            res.status(200).json(category)
            
        } 
        catch (error) {
           console.log(error)
        }
    },
    delete: async (req,res) => {
        try {
            await Category.updateOne({ _id: req.body.id }, { active: false })
            res.status(200).json({ msg: 'Category has been deleted' })
        } 
        catch (error) {
            console.log(error)
        }
    },
    update: async (req,res) => {
        try {
            let changes = {}
            if(req.body.name){
                changes['name'] = req.body.name
            }
            if(req.body.split){
                changes['split'] = req.body.split
            }
            if(req.body.budget){
                changes['budget'] = req.body.budget
            }

            const category = await Category.updateOne({ _id: req.body.id }, changes)

            res.status(200).json('Category has been updated')
        } 
        catch (error) {
            console.log(error)
        }
    }
}