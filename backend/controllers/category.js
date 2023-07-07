const Category = require("../models/Category")

module.exports = {
    getUserCategories: async (req,res) => {
        try {
            let categories = await Category.find({ user: req.body.user })
            res.status(200).json(categories)
        } catch (error) {
            console.log(error)
        }
    },
    newCategory: async (req,res) => {
        try {
            let category = await Category.create({
                name: req.body.name,
                user: req.body.user,
                budget: req.body.budget,
                joint: req.body.joint,
                split: req.body.split
            })

            res.status(200).json(category)
            
        } catch (error) {
           console.log(error)
        }
    },
    deleteCategory: async (req,res) => {
        try {
            await Category.updateOne({ _id: req.body.id }, { active: false, deletedTime: new Date() })
            res.status(200).json({ msg: 'Category has been deactivated' })
        } catch (error) {
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

            res.json('it worked')
        } 
        catch (error) {
            console.log(error)
        }
    },
    updateBudget: async (req,res) => {
        try {
            const category = await Category.findOne({ _id: req.body.id })
            console.log(category.budget)
            category.budget.set('test', 12)
            res.json('it worked')
        } 
        catch (error) {
            console.log(error)
        }
    }
}