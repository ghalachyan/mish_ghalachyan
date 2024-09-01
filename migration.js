import Users from './models/Users.js';
import Books from './models/Books.js';
import Reviews from './models/Reviews.js';

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


Books.belongsTo(Users );
Books.hasMany(Reviews,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});

Reviews.belongsTo(Users);
Reviews.belongsTo(Books);

const models = [
    Users,
    Books,
    Reviews,
];

(async () => {
    for (const model of models) {
        await model.sync({ alter: true });
        console.log(`${model.name} table created or updated`);
    }
})()

export default models;