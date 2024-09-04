import sequelize from '../clients/sequelize.mysql.js';
import {DataTypes, Model} from 'sequelize';
import Books from "./Books.js";
import Favorites from "./Favorites.js";
import Comments from "./Comments.js";
import Reviews from "./Reviews.js";

class Users extends Model {}

Users.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return '*****';
            },
        },

        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
            allowNull: false,
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

Users.hasMany(Books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Books.belongsTo(Users );

Users.hasMany(Favorites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Favorites.belongsTo(Users);

Users.hasMany(Comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Comments.belongsTo(Users);

Reviews.belongsTo(Users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});

export default Users;