const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")

module.exports.getAccess = async (req, res) => {
    try {
        if (!(req.query.accessCode === process.env.Admin_Access_Code)) {
            return res.status(401).json({ message: "Wrong Access Code" })
        }

        dotenv.config()
        const jwToken = jwt.sign(
            process.env.Admin_Access_Code,
            process.env.Admin_Access_Token
        )
        res.json({ accessToken: jwToken })
    } catch (error) {
        res.status(500).json({ message: "Error while logging in" })
    }
}
