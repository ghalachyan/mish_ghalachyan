import { DataTypes, Model } from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';


class Reviews extends Model { }

Reviews.init(
    {
        id:{
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        review:{
            type: DataTypes.TEXT,
            allowNull: false,
        },

        rating: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    {
        sequelize,
        timestamps: true,
        modelName: 'reviews',
        tableName: 'reviews',
    }
)

export default Reviews;