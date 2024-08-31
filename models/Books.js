import { DataTypes, Model } from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';
import Users from "./Users.js";
import Reviews from "./Reviews.js";

class Books extends Model { }

Books.init(
    {
        id:{
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        author: {
            type: DataTypes. STRING,
            allowNull: false
        },

    },
    {
        sequelize,
        timestamps: true,
        modelName: 'books',
        tableName: 'books',
        indexes: [
            {
                unique: true,
                fields: ['title'],
            }
        ]
    }
);

Books.belongsTo(Users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Books.hasMany(Reviews);

export default Books;