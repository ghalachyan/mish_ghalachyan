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
        bookId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: 'books',
                key: 'id',
            }
        },
        categoryId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: 'category',
                key: 'id',
            }
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