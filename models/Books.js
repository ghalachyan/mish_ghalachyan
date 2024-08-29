import { DataTypes, Model } from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';

class Books extends Model { };

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
                fields: ['author']
            }
        ]
    }
)

export default Books;