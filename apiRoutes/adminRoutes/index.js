const express = require("express")
const router = express.Router()
const { uploadFile } = require("./middleware")
const { uploadUsers, addCandidate, addPosition } = require("./populateDB")
const { clearDatabase, deleteCandidate, deletePosition } = require("./deleteDB")
const { getOverview } = require("./overview")

router.post("/upload_user_files", uploadFile.single("file"), uploadUsers)
router.post("/addposition", addPosition)
router.get("/getOverview", getOverview)
router.post("/addcandidate", addCandidate)

router.post("/deleteCandidate", deleteCandidate)
router.post("/deletePosition", deletePosition)
router.delete("/deleteElection", clearDatabase)

module.exports = router
