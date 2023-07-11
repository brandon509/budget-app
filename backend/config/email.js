const nodemailer = require('nodemailer')

module.exports = async (email, subject, body) => {
    try{
        const transporter = nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
            }
        })
    
        const mailInfo = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: subject,
            html: body
        }
    
        transporter.sendMail(mailInfo, (err, info) => {
            if(err){
                console.log(err)
            }
            else{
                console.log(`email sent: ${info.response}`)
            }   
        })
    }
    catch(err){
        console.log(err)
    }
}
