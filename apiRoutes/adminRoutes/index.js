const express = require("express")
const router = express.Router()
const { uploadFile } = require("./middleware")
const { uploadUsers, addCandidate, addPosition } = require("./populateDB")
const { getResults } = require("./electionResults")

router.post("/upload_user_files", uploadFile.single("file"), uploadUsers)
router.post("/addposition", addPosition)
router.get("/getResults", getResults)
router.post("/addcandidate", addCandidate)

module.exports = router
