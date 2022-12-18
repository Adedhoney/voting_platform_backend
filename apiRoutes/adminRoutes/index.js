const express = require("express")
const router = express.Router()
const { uploadFile } = require("./middleware")
const { uploadUsers, addCandidate, addPosition } = require("./populateDB")

router.post("/upload_user_files", uploadFile.single("file"), uploadUsers)
router.post("/addposition", addPosition)
router.post("/addcandidate", addCandidate)

module.exports = router
