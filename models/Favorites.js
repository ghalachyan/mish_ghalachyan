import {DataTypes, Model} from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';

class Favorites extends Model {}

Favorites.init(
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
        modelName: 'favorites',
        tableName: 'favorites',
    }
);

export default Favorites;