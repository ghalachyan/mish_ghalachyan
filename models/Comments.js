import {DataTypes, Model} from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';

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

export default Comments;