const db = require("../../models")

const getOverview = async (req, res) => {
    try {
        // GET POSITIIONS
        let positions = await db.position.findAll({})
        for (let position of positions) {
            let voteCount = await db.vote.count({
                where: { position_id: position.position_id },
            })
            position.dataValues.votes = voteCount
        }
        // get candidates
        let candidates = await db.candidate.findAll({})
        for (let candidate of candidates) {
            let voteCount = await db.vote.count({
                where: { candidate_id: candidate.candidate_id },
            })
            candidate.dataValues.votes = voteCount
        }
        // get number of uses that have voted
        let usersVoted = await db.user.count({
            where: { vote_status: true },
        })
        // get total number of users
        let totalUsers = await db.user.count()

        return res.json({ positions, candidates, usersVoted, totalUsers })
    } catch (error) {
        console.log(error)
        return res
            .status(501)
            .json({ message: "Error occured when getting results" })
    }
}

module.exports.getOverview = getOverview
