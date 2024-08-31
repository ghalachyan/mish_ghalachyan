import Users from './models/Users.js';
import Books from './models/Books.js';
import Reviews from './models/Reviews.js';

const models = [
    Users,
    Books,
    Reviews
];

(async () => {
    for (const model of models) {
        await model.sync({ alter: true });
        console.log(`${model.name} table created or updated`);
    }
})()

export default models;