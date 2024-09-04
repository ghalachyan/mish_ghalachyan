import md5 from "md5";
import Books from "./Books.js";
import Reviews from "./Reviews.js";
import Comments from "./Comments.js";
import Favorites from "./Favorites.js";
import {DataTypes, Model} from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';

const { USER_PASSWORD_SECRET } = process.env;

class Users extends Model {
    static  hash (password){
        return md5(md5(password) + USER_PASSWORD_SECRET);
    }
}

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
            set (value) {
                this.setDataValue('password', Users.hash(value));
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

Users.hasMany(Reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Reviews.belongsTo(Users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});

export default Users;