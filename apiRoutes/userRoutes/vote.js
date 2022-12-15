const db = require("../../models")

module.exports.castVote = async (req, res) => {
    try {
        let votes = req.body.votes

        for (let vote of votes) {
            let alreadyVoted = await db.vote.findOne({
                where: {
                    user_id: req.userId,
                    position_id: vote.positionId,
                },
            })
            if (alreadyVoted) {
                return res.status(406).json({ message: "User already voted" })
            }
            await db.vote.create({
                candidate_id: vote.candidateId,
                position_id: vote.positionId,
                user_id: req.userId,
            })
        }
        return res.status(201).json({ message: "Vote cast successfully" })
    } catch {
        return res
            .status(408)
            .json({ message: "Error occured when casting vote" })
    }
}
