const Category = require("../models/Category")

module.exports = {
    getUserCategories: async (req,res) => {
        try {
            let categories = await Category.find({ user: req.body.user })
            res.json(categories)
        } catch (error) {
            console.log(error)
        }
    },
    newCategory: async (req,res) => {
        try {
            let category = Category.create({
                name: req.body.name,
                user: req.body.user,
                budget: req.body.budget,
                joint: req.body.joint,
                split: req.body.split
            })

            console.log(req.body)
            res.json('test')
            
        } catch (error) {
           console.log(error) 
        }
    },
    deleteCategory: async (req,res) => {
        try {
            await Category.updateOne({ _id: req.body.id }, { active: false })
            res.json('it worked')
        } catch (error) {
            console.log(error)
        }
    },
    updateCategory: async (req,res) => {

    }
}