import { DataTypes, Model } from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';
import Books from "./Books.js";

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
            type: DataTypes.INTEGER,
            allowNull: false
        },

    },
    {
        sequelize,
        timestamps: true,
        modelName: 'reviews',
        tableName: 'reviews',
    }
);


Reviews.belongsTo(Books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});



export default Reviews;