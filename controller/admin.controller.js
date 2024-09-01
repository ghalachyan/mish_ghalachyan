import Category from "../models/Category.js";

export default {
    async addCategory(req, res) {
        try {
            const user = req.user;
            const {name} = req.body;
            console.log(user);
            if (!user || !user.isAdmin) {
                return res.status(403).json({
                    message: 'Forbidden: Admins only'
                });
                return;
            }

            const category = await Category.create({name});
            res.status(201).json({
                category,
            })
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    message: 'Category already exists'
                });
            }
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    }
}