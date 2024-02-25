const Category = require("../models/Category")
const validator = require("validator")

module.exports = {
    get: async (req,res) => {
        try {
            let { year, month } = req.query
            month++
            const date = new Date(year,month,1,-5,0,0)

            const categories = await Category.find({ user: req.user.id })

            const activeCategories = categories.filter(x => x.active)
            const currentCategories = categories.filter(x => (x.deactivationDate > date && x.createdAt < date) || (x.createdAt < date && x.active))
            
            res.status(200).json({ activeCategories, currentCategories })
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
            await Category.updateOne({ _id: req.body.id }, { active: false, deactivationDate: new Date() })
            res.status(200).json({ id: req.body.id })
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

            await Category.updateOne({ _id: req.body.id }, changes)
            const category = await Category.findById(req.body.id)

            res.status(200).json(category)
        } 
        catch (error) {
            console.log(error)
        }
    }
}