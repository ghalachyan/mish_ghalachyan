import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import usersRouter from './routes/users.js';
import tasksRouter from './routes/tasks.js';

dotenv.config();

const port = process.env.PORT
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});