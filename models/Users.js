import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';
import Books from "./Books.js";
import Reviews from "./Reviews.js";

class Users extends Model { }

Users.init(
    {
        id:{
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        userName:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes. STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('password');
                return rawValue ? '*****' : null; // Masking the password
            },
        },

    },
    {
        sequelize,
        timestamps: true,
        modelName: 'users',
        tableName: 'users',
        indexes: [
            {
                unique: true,
                fields: ['email', 'userName'],
            }
        ]
    }
);

export default Users;