import Users from './models/Users.js';
import Books from './models/Books.js';
import Reviews from './models/Reviews.js';
import Category from './models/Category.js';
import Comments from './models/Comments.js';
import Favorites from './models/Favorites.js';
import BookCategory from './models/BookCategory.js';

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