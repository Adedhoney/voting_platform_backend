const db = require("../../models")

module.exports.castVote = async (req, res) => {
    try {
        let votes = req.body.votes
        // Check user vote status
        let userInfo = await db.user.findByPk(req.userId)
        if (userInfo.vote_status == 1) {
            return res.status(400).json({ message: "User already voted" })
        }

        for (let vote of votes) {
            //check duplicate vote
            let alreadyVoted = await db.vote.findOne({
                where: {
                    user_id: req.userId,
                    position_id: vote.positionId,
                },
            })
            if (alreadyVoted) {
                return res.status(400).json({ message: "User already voted" })
            }
            await db.vote.create({
                candidate_id: vote.candidateId,
                position_id: vote.positionId,
                user_id: req.userId,
            })
        }

        // Update user to show they have voted
        await db.user.update(
            { vote_status: 1 },
            {
                where: { user_id: req.userId },
            }
        )
        return res.status(201).json({ message: "Vote cast successfully" })
    } catch {
        return res
            .status(500)
            .json({ message: "Error occured when casting vote" })
    }
}
