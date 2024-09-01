import {DataTypes, Model} from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'category',
        tableName: 'category',
        indexes: [
            {
                unique: true,
                fields: ['name'],
            }
        ]
    }
);

export default Category;