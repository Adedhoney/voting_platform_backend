module.exports = (sequelize, DataTypes) => {
    const positions = sequelize.define("position", {
        position_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        position_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            uniqueKey: true,
        },
    })
    positions.associate = (models) => {
        positions.hasMany(models.candidate, {
            foreignKey: "running_position",
            onDelete: "CASCADE",
        })
    }
    return positions
}
