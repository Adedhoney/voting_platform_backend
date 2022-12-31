const express = require("express")
const router = express.Router()
const { uploadFile, authorize } = require("./middleware")
const { uploadUsers, addCandidate, addPosition } = require("./populateDB")
const { clearDatabase, deleteCandidate, deletePosition } = require("./deleteDB")
const { getOverview } = require("./overview")
const { getAccess } = require("./authentication")

router.get("/getAccess", getAccess)
router.post(
    "/upload_user_files",
    authorize,
    uploadFile.single("file"),
    uploadUsers
)
router.post("/addposition", authorize, addPosition)
router.get("/getOverview", authorize, getOverview)
router.post("/addcandidate", authorize, addCandidate)

router.post("/deleteCandidate", authorize, deleteCandidate)
router.post("/deletePosition", authorize, deletePosition)
router.delete("/deleteElection", authorize, clearDatabase)

module.exports = router
