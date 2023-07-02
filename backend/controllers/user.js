const User = require('../models/User')

module.exports = {
    newUser: async (req,res) => {
        try {
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            res.json("user added")
        } catch (error) {
            console.log(error)
        }
    }
}