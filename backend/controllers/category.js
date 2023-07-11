const Category = require("../models/Category")
const validator = require("validator")

module.exports = {
    getUserCategories: async (req,res) => {
        try {
            let categories = await Category.find({ user: req.user.id })
            res.status(200).json(categories)
        } catch (error) {
            console.log(error)
        }
    },
    newCategory: async (req,res) => {
        try {
            let category = await Category.create({
                name: req.body.name,
                user: req.user.id,
                budget: req.body.budget,
                joint: req.body.joint,
                split: req.body.split
            })

            res.status(200).json(category)
            
        } 
        catch (error) {
           console.log(error)
        }
    },
    deleteCategory: async (req,res) => {
        try {
            await Category.updateOne({ _id: req.body.id }, { active: false, deletedTime: req.body.time })
            res.status(200).json({ msg: 'Category has been deactivated' })
        } 
        catch (error) {
            console.log(error)
        }
    },
    updateCategory: async (req,res) => {
        try {
            let changes = {}
            if(req.body.name){
                changes['name'] = req.body.name
            }
            if(req.body.joint){
                changes['joint'] = req.body.joint
            }
            if(req.body.split){
                changes['split'] = req.body.split
            }

            const category = await Category.updateOne({ _id: req.body.id }, changes)

            res.status(200).json('Category has been updated')
        } 
        catch (error) {
            console.log(error)
        }
    },
    updateBudget: async (req,res) => {
        try {
            if(!validator.isDate(req.body.month)){
                return res.status(400).json('time is not in the correct format')
            }
            
            const category = await Category.findOne({ _id: req.body.id })
            category.budget.set(req.body.month, req.body.budget)
            category.save()
            res.status(200).json('budget updated')
        } 
        catch (error) {
            console.log(error)
        }
    }
}