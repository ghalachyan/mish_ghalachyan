import {DataTypes, Model} from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';

class BookCategory extends Model {}

BookCategory.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

    },
    {
        sequelize,
        timestamps: true,
        modelName: 'bookCategory',
        tableName: 'bookCategory',
    }
);

export default BookCategory;