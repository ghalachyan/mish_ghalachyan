import db from '../clients/db.mysql.js';
import md5 from 'md5';

export default {
    async getUsersList() {
        const [rows] = await db.query(`SELECT * FROM users`);
        return rows;
    },
    async getUserProfile(data) {
        const values = [data.id];
        const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, values);

        if (rows.length === 0) {
            return { success: false, message: 'Invalid ID user not found' };
        }
        return { success: true, rows }
    },
    async registration(data) {

        const values = [data.fName, data.lName, data.lowerCaseEmail, data.hashedPassword];

        const [rows] = await db.query(`
        INSERT INTO users (first_name, last_name, email, password)
        VALUES (?, ?, ?, ?)
        `, values);
        return rows;

    },
    async login(data) {

        const values = [data.lowerCaseEmail];
        const [rows] = await db.query(`
            SELECT * FROM users WHERE email = ?`,
            values);

        const user = rows[0];
        
        if (user === undefined) {
            return { success: false, message: 'User not found' }
        }

        const hashedPassword = md5(data.password);

        if (user.password !== hashedPassword) {
            return { success: false, user: 'Invalid password' };
        }

        return { success: true, user: user }
    },
    async updateUserProfile(data) {
        const values = [data.fName, data.lName, data.lowerCaseEmail, data.hashedPassword, data.id];

        const [rows] = await db.query(`
            UPDATE users
            SET first_name = ?, last_name = ?, email = ?, password = ?
            WHERE id = ?
            `, values);

        if (rows.affectedRows === 0) {
            return { success: false, message: 'User not found' }
        }

        return { success: true, rows }
    },
    async deleteProfile(data) {
        const values = [data.id];
        const [rows] = await db.query(`DELETE FROM users WHERE id = ?`, values);
        console.log(rows)
        if (rows.affectedRows === 0) {
            return { success: false, message: 'Task not found' }
        }
        return { success: true, rows }
    }
};