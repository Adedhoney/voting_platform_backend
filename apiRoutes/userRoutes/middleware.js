const db = require("../../models")
const jwt = require("jsonwebtoken")

module.exports.authorize = (req, res, next) => {
    const accessTokenheader = req.headers.authorization
    if (accessTokenheader == null) return res.sendStatus(401)
    const accessToken = accessTokenheader.split(" ")[1]

    require("dotenv").config()

    jwt.verify(accessToken, process.env.Access_Token, (err, userId) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" })
        } // fgf
        ;(async () => {
            const userData = await db.user.findByPk(userId)
            if (!userData)
                return res.status(401).json({ message: "Unauthorized" })

            req.userId = userId
            next()
        })()
    })
}
