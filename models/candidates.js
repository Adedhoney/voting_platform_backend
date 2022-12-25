module.exports = (sequelize, DataTypes) => {
    const candidates = sequelize.define("candidate", {
        candidate_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        candidate_matric: {
            type: DataTypes.STRING(20),
            allowNull: false,
            uniqueKey: true,
        },
        candidate_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        candidate_department: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        candidate_level: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        running_position: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "positions", Key: "position_id" },
        },
        picture: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
    })
    candidates.associate = (models) => {
        candidates.belongsTo(models.position, {
            foreignKey: "running_position",
        })
        candidates.hasMany(models.vote, {
            foreignKey: "candidate_id",
            onDelete: "CASCADE",
        })
    }
    return candidates
}
