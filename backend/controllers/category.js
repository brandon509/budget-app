const Category = require("../models/Category")

module.exports = {
    getCategories: async (req,res) => {
        try {
            let categories = await Category.find()
            res.json(categories)
        } catch (error) {
            console.log(error)
        }
    },
    newCategory: async (req,res) => {
        try {
            let category = Category.create({
                name: req.body.name,
                //user: req.body.user,
                budget: req.body.budget,
                joint: req.body.joint,
                split: req.body.split
            })

            console.log(req.body)
            res.json('test')
            
        } catch (error) {
           console.log(error) 
        }
    }
}