import { DataTypes, Model } from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';
import Favorites from "./Favorites.js";
import Category from "./Category.js";
import BookCategory from "./BookCategory.js";
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

Books.hasMany(Favorites,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});
Favorites.belongsTo(Books);

Books.belongsToMany(Category, {through: BookCategory})
Category.belongsToMany(Books, {through: BookCategory});

Books.hasMany(Reviews);
Reviews.belongsTo(Books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});

export default Books;