import Books from '../models/Books.js';
import sequelize from "../clients/sequelize.mysql.js";
import Users from "../models/Users.js";

export default {
    async getBooksCount(req, res) {
        try {
            const total = await Books.count();

            let page = +req.query.page;
            let limit = +req.query.limit;
            const order = req.query.order;
            const offset = (page - 1) * limit;

            const maxPageCount = Math.ceil(total / limit);

            if (page > maxPageCount) {
                res.status(404).json({
                    massage: 'Page not found.',
                    books: []
                });
                return;
            }

            const {id: userId} = req.user;
            const userExists = await Users.findByPk(userId);

            if (!userExists) {
                res.status(404).json({
                    message: 'User not found.',
                })
                return;
            }

            const topActiveReviewers = await Books.findAll({
                attributes: [
                    'author',
                    [
                        sequelize.fn('COUNT', sequelize.col('id')),
                        'bookCount'
                    ],
                ],
                group: ['author'],
                order: [
                    [
                        sequelize.fn('COUNT', sequelize.col('id')),
                        order
                    ]
                ],
                limit,
                offset
            })

            res.status(200).json({
                message: 'Most active reviewers retrieved successfully.',
                topActiveReviewers,
                total,
                currentPage: page,
                totalPages: maxPageCount
            })

        }catch (e){
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    }
}