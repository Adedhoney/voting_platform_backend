const path = require("path")
const multer = require("multer")
const fs = require("fs")

const jwt = require("jsonwebtoken")

// Authorize
module.exports.authorize = (req, res, next) => {
    const accessTokenheader = req.headers.authorization
    if (accessTokenheader == null) return res.sendStatus(401)
    const accessToken = accessTokenheader.split(" ")[1]

    require("dotenv").config()

    jwt.verify(
        accessToken,
        process.env.Admin_Access_Token,
        (err, accessCode) => {
            if (err) {
                return res.status(410).json({ message: "Unauthorized" })
            } // fgf
            ;(() => {
                const hasAccess = accessCode == process.env.Admin_Access_Code
                if (!hasAccess)
                    return res.status(410).json({ message: "Unauthorized" })

                next()
            })()
        }
    )
}

// Upload file
const excelFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")
    ) {
        cb(null, true)
    } else {
        return cb(new Error("Please upload only excel file."), false)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folderPath = __dirname + "/../../uploadedFiles"
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true })
        }
        cb(null, folderPath)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-UserFile-${file.originalname}`)
    },
})

module.exports.uploadFile = multer({
    storage: storage,
    fileFilter: excelFilter,
})
