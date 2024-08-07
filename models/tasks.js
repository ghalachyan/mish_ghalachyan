import db from "../clients/db.mysql.js";

export default {
    async getTasksList() {
        const [rows] = await db.query(`SELECT * FROM tasks`);
        return rows;
    },
    async getTask(data) {
        const values = [data.userId];
        const [rows] = await db.query(`SELECT * FROM tasks WHERE user_id = ?`, values);

        if (rows.length === 0) {
            return { success: false, message: 'Invalid ID task not found' };
        }
        return { success: true, rows }
    },
    async createTask(data) {
        const values = [data.title, data.description, data.taskDate, data.userId];

        const [rows] = await db.query(`
        INSERT INTO tasks (title, description, task_date, user_id)
        VALUES (?, ?, ?, ?)
        `, values);
        return rows;
    },
    async updateTask(data) {
        const values = [data.title, data.description, data.taskDate, data.userId];

        const [rows] = await db.query(`
            UPDATE tasks
            SET title = ?, description = ?, task_date = ?, completed = 1
            WHERE user_id = ? limit 1
            `, values);

        if (rows.affectedRows === 0) {
            return { success: false, message: 'Task not found' }
        }

        return { success: true, rows }
    },
    async deleteTask(data) {
        const values = [data.userId];
        const [rows] = await db.query(`DELETE FROM tasks WHERE user_id = ? limit 1`, values);

        if (rows.affectedRows === 0) {
            return { success: false, message: 'Task not found' }
        }
        return { success: true, rows }
    }
}