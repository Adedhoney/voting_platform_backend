const db = require("../../models");

module.exports.getUserData = async (req, res) => {
  const userData = await db.user.findByPk(req.userId);
  res.json(userData);
};
// module.exports.getElectionData = async (req, res) => {
//     const positions = await db.position.findAll()
//     const candidateInfo = await db.candidate.findAll({
//         include: db.position,
//     })
//     res.json({
//         positions: [...positions],
//         candidates: [...candidateInfo],
//     })
// }
module.exports.getElectionData = async (req, res) => {
  try {
    const positions = await db.position.findAll({
      order: [["createdAt", "ASC"]], // Order by creation time in ascending order
    });

    const candidateInfo = await db.candidate.findAll({
      include: db.position,
      order: [["createdAt", "ASC"]], // Order by creation time in ascending order
    });

    res.json({
      positions: [...positions],
      candidates: [...candidateInfo],
    });
  } catch (error) {
    console.error("Error fetching election data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
