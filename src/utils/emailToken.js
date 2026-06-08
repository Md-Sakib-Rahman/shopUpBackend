const jwt = require("jsonwebtoken")

function generateEmailToken (user){
    return jwt.sign(
        {
            id:user._id,
            email: user.email

        },
        process.env.EMAIL_TOKEN_SECRET,
        {
            expiresIn:"30m"
        }
    )
}


function verifyEmailToken(token){
    return jwt.verify(token, process.env.EMAIL_TOKEN_SECRET)
}



module.exports = {
    generateEmailToken,
    verifyEmailToken
}