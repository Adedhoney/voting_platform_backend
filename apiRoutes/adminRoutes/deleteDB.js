const db = require("../../models")

const deletePosition = async (req, res) => {
    try {
        let des = await db.position.destroy({
            where: { position_id: req.body.positionId },
            cascade: true,
        })
        return res
            .status(201)
            .json({ message: "Position deleted successfully" })
    } catch (error) {
        return res
            .status(501)
            .json({ message: "Error while deleting position" })
    }
}
const deleteCandidate = async (req, res) => {
    try {
        let des = await db.candidate.destroy({
            where: { candidate_id: req.body.candidateId },
        })
        return res
            .status(201)
            .json({ message: "Candidate deleted successfully" })
    } catch (error) {
        return res
            .status(501)
            .json({ message: "Error while deleting candidate" })
    }
}
const clearDatabase = async (req, res) => {
    try {
        let des = await db.position.destroy({
            truncate: true,
        })
        let troy = await db.user.destroy({
            truncate: true,
        })
        return res
            .status(201)
            .json({ message: "Database cleared successfully" })
    } catch (error) {
        return res
            .status(501)
            .json({ message: "Error while clearing database" })
    }
}

module.exports.clearDatabase = clearDatabase
module.exports.deleteCandidate = deleteCandidate
module.exports.deletePosition = deletePosition
