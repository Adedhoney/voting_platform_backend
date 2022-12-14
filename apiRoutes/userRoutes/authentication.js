const db = require("../../models")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")

module.exports.logIn = async (req, res) => {
    const loginDetails = await db.user.findOne({
        where: {
            email: req.query.email,
        },
    })
    console.log(logindetails)
    if (!loginDetails) {
        return res.status(401).json({ message: "User not found" })
    }
    const correctPassword = await bcrypt.compare(
        req.query.password,
        loginDetails.password
    )
    if (!correct_Password) {
        return res.status(402).json({ message: "Incorrect Password" })
    }

    dotenv.config()
    const jwToken = jwt.sign(loginDetails.user_id, process.env.Access_Token)
    res.json({ accessToken: jwToken })
}
