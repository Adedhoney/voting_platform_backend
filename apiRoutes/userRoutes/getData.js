const db = require("../../models")

module.exports.getUserData = async (req, res) => {
    const userData = await db.user.findByPk(req.userId)
    res.json(userData)
}
module.exports.getElectionData = async (req, res) => {
    const electionInfo = await db.candidate.findAll({
        include: db.position,
    })
    res.json(electionInfo)
}
