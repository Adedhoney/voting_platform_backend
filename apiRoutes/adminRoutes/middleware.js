const path = require("path")
const multer = require("multer")
const fs = require("fs")

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

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folderPath = __dirname + "/../../uploadedFiles"
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true })
        }
        cb(null, folderPath)
    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, `${Date.now()}-UserFile-${file.originalname}`)
    },
})

module.exports.uploadFile = multer({
    storage: storage,
    fileFilter: excelFilter,
})
