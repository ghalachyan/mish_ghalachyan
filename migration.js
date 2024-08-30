import Users from './models/Users.js';
import Books from './models/Books.js';
import Reviews from './models/Reviews.js';

Users.hasMany(Books);
Users.hasMany(Reviews);

Books.belongsTo(Users, {foreignKey: 'userId'});
Books.hasMany(Reviews);

Reviews.belongsTo(Users, {foreignKey: 'userId'});
Reviews.belongsTo(Books, {foreignKey: 'bookId'});

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