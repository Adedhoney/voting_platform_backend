module.exports = (sequelize, DataTypes) => {
    const votes = sequelize.define("vote", {
        vote_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        candidate_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "candidates", Key: "candidate_id" },
        },
        position_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "positions", Key: "position_id" },
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "users", Key: "user_id" },
        },
    })
    votes.associate = (models) => {
        votes.belongsTo(models.candidate, {
            foreignKey: "candidate_id",
        })
        votes.belongsTo(models.user, {
            foreignKey: "user_id",
        }),
            votes.belongsTo(models.position, {
                foreignKey: "position_id",
            })
    }
    return votes
}
