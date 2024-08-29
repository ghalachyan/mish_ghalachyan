import 'dotenv/config.js';
import morgan from 'morgan';
import express from 'express';

import sequelize from './clients/sequelize.mysql.js';
import models from './migration.js';
import indexRouter from './routes/index.js';

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/', indexRouter);

(async () => {
    try {
        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfuly.');
        }).catch((e) => {
            console.error('Unable to connect to the database:', e);
        });

        for (const model of models) {
            await model.sync({ alter: true });
            console.log(`${model.name} table created or updated`);
        }

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
})()