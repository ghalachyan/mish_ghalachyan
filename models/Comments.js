import {DataTypes, Model} from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';
import Reviews from "./Reviews.js";

class Comments extends Model {}

Comments.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'comments',
        tableName: 'comments',
    }
);

Reviews.hasMany(Comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'reviewId'
});
Comments.belongsTo(Reviews);

export default Comments;