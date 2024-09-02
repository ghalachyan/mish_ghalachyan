import Category from "../models/Category.js";
import Users from "../models/Users.js";
import Reviews from "../models/Reviews.js";

export default {
    async addCategory(req, res) {
        try {
            const user = req.user;
            const {name} = req.body;

            const userExist = await Users.findByPk(user.id);

            if (!user || userExist.role !== 'admin') {
                res.status(403).json({
                    message: 'Forbidden: Admins only'
                });
                return;
            }

            const category = await Category.create({name});
            res.status(201).json({
                message: 'category add successfully',
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
    },

    async getUsers(req, res) {
        try {
            const user = req.user;

            const userIsExist = await Users.findByPk(user.id);

            if (!user || userIsExist.role !== 'admin') {
                res.status(403).json({
                    message: 'Forbidden: Admins only'
                });
                return;
            }

            const total = await Users.count();

            const order = req.query.order;
            const  orderBy = req.query.orderBy;
            let page = +req.query.page;
            let limit = +req.query.limit;
            let offset = (page - 1) * limit;

            const maxPageCount = Math.ceil(total / limit)

            if (page > maxPageCount) {
                res.status(404).json({
                    massage: 'User does not found.',
                });
                return;
            }

            const users = await Users.findAll({
                offset,
                limit,
                order:[
                    [orderBy, order]
                ],
            });

            res.status(201).json({
                message: 'Users retrieved successfully',
                users,
            })
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async deleteUser(req, res) {
        try {
            const user = req.user;
            const userId = req.params.userId;

            const userIsExist = await Users.findByPk(user.id);

            if (!user || userIsExist.role !== 'admin') {
                res.status(403).json({
                    message: 'Forbidden: Admins only'
                });
                return;
            }

            const userDelete = await Users.findByPk(userId);

            if (!userDelete) {
                res.status(404).json({
                    message: 'User not found.',
                });
                return;
            }

            await userDelete.destroy();

            res.status(200).json({
                message: 'User deleted successfully',
            })

        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async deleteReview(req, res) {
        try {
            const user = req.user;
            const reviewId = req.params.reviewId;

            const userIsExist = await Users.findByPk(user.id);

            if (!user || userIsExist.role !== 'admin') {
                res.status(403).json({
                    message: 'Forbidden: Admins only'
                });
                return;
            }

            const reviewDelete = await Reviews.findByPk(reviewId);

            if (!reviewDelete) {
                res.status(404).json({
                    message: 'Review not found.',
                });
                return;
            }

            await reviewDelete.destroy();

            res.status(200).json({
                message: 'Review deleted successfully',
            })

        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    }
}