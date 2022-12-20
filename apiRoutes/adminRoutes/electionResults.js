const db = require("../../models")

const getResults = async (req, res) => {
    try {
        let candidates = await db.candidate.findAll({})
        for (let candidate of candidates) {
            let votes = await db.vote.findAll({
                where: { candidate_id: candidate.candidate_id },
            })
            let voteCount = votes.length
            candidate.dataValues.votes = voteCount
        }
        return res.json(candidates)
    } catch (error) {
        console.log(error)
        return res
            .status(501)
            .json({ message: "Error occured when getting results" })
    }
}

module.exports.getResults = getResults
