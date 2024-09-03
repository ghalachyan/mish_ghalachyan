import Users from './models/Users.js';
import Books from './models/Books.js';
import Reviews from './models/Reviews.js';
import Category from './models/Category.js';
import Comments from './models/Comments.js';
import Favorites from './models/Favorites.js';
import BookCategory from './models/BookCategory.js';

Users.hasMany(Books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Users.hasMany(Reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Users.hasMany(Comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Users.hasMany(Favorites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});

Books.belongsTo(Users );
Books.hasMany(Reviews,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});
Books.hasMany(Favorites,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});
Books.belongsToMany(Category, {through: BookCategory})

Reviews.belongsTo(Users);
Reviews.belongsTo(Books, { foreignKey: 'bookId' });
Reviews.hasMany(Comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'reviewId'
});

Comments.belongsTo(Users);
Comments.belongsTo(Reviews);

Favorites.belongsTo(Users);
Favorites.belongsTo(Books);

Category.belongsToMany(Books, {through: BookCategory});

const models = [
    Users,
    Books,
    Reviews,
    Comments,
    Favorites,
    Category,
    BookCategory
];

(async () => {
    for (const model of models) {
        await model.sync({ alter: true });
        console.log(`${model.name} table created or updated`);
    }
})()

export default models;