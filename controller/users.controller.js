import utils from "../utils/utils.js";
import Users from "../models/Users.js";
import Reviews from "../models/Reviews.js";
import sequelize from "../clients/sequelize.mysql.js";

export default {
    async registration(req, res) {
        try {
            const {
                userName,
                email,
                password,
            } = req.body

            const avatar = await utils.handleFilePath(req.file);

            const [param1, param2] = await Users.findOrCreate({
                where: {email: email.toLowerCase()},
                defaults: {
                    userName,
                    email: email.toLowerCase(),
                    password,
                    avatar,
                },
            });

            if (!param2) {
                res.status(409).json({
                    message: 'Email already exists!'
                });
                return;
            }

            res.status(201).json({
                message: 'User created successfully',
                param1
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const emailLowerCase = email.toLowerCase();

            const user = await Users.findOne({
                where: {email: emailLowerCase}
            });

            const hashPassword = Users.hash(password);

            if (!user || hashPassword !== user.getDataValue('password')) {
                res.status(401).json({
                    message: 'Invalid email or password',
                });
                return;
            }

            const payload = {
                id: user.id,
                email: user.email,
            };

            const expiresIn = {
                expiresIn: '50m'
            };

            const token = utils.createToken(payload, expiresIn);

            if (user.role === 'admin') {
                res.status(200).json({
                    message: 'Login successfully',
                    token,
                    isAdmin: true
                });
                return;
            }

            res.status(200).json({
                message: 'Login successfully',
                token,
                isAdmin: false
            });

        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async update(req, res) {
        try {
            const {id} = req.user;
            const {userName, email} = req.body;

            const user = await Users.findByPk(id);

            if (!user) {
                res.status(404).json({
                    message: 'User not found.',
                });

                return;
            }

            const avatar = await utils.updateFile(req.file, user.avatar);

            await Users.update(
                {
                    userName,
                    email,
                    avatar,
                },
                {
                    where: {id}
                }
            );

            res.status(200).json({
                message: 'User updated successfully',
            })
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async getReviewSummary(req, res) {
        try {
            const userId = req.params.userId;

            const userExists = await Users.findByPk(userId);

            if (!userExists) {
                res.status(404).json({
                    message: 'User not found.',
                })
                return;
            }

            const reviewSummary = await Reviews.findOne({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'totalReviews'],
                    [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
                    [sequelize.fn('COUNT', sequelize.col('bookId')), 'totalBooksReviewed'],
                ],
                where: {
                    userId
                }
            });

            if (!reviewSummary) {
                res.status(404).json({
                    message: 'No reviews found for this user',
                    reviewSummary: []
                });
                return;
            }

            res.status(200).json({
                message: 'User review summary retrieved successfully.',
                reviewSummary
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async getActiveReviewers(req, res) {
        try {
            const total = await Users.count();

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

            const topActiveReviewers = await Users.findAll({
                attributes: [
                    'id',
                    'userName',
                    'email',
                    [
                        sequelize.fn('COUNT', sequelize.col('reviews.id')),
                        'reviewCount'
                    ],

                ],

                include: [
                    {
                        model: Reviews,
                        attributes: []
                    },
                ],
                group: ['id'],
                order: [
                    [
                        sequelize.fn('COUNT', sequelize.col('reviews.id')),
                        order
                    ]
                ],
                // limit,
                // offset
            })

            res.status(200).json({
                message: 'Most active reviewers retrieved successfully.',
                topActiveReviewers,
                total,
                currentPage: page,
                totalPages: maxPageCount
            })

        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    }
}