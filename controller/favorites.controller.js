import Favorites from "../models/Favorites.js";
import Books from "../models/Books.js";
import Users from "../models/Users.js";

export default {
    async markFavorite(req, res) {
        try {
            const userId = req.user.id;
            const bookId = req.params.bookId;

            const book = await Books.findByPk(bookId);
            const user = await Users.findByPk(userId)

            if (!book || !user) {
                res.status(404).json({
                    message: 'Book or user not found',
                });
                return;
            }

            const [favorite, created] = await Favorites.findOrCreate({
                where: {userId, bookId},
            });

            if (!created) {
                res.status(400).json({
                    message: 'Book already marked as favorite',
                });
                return;
            }

            res.status(201).json({
                message: 'Book successfully marked as favorite',
                favorite,
            })
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    async getFavorites(req, res) {
        try {
            const userId = req.params.userId;

            const user = await Users.findByPk(userId);

            if (!user) {
                res.status(404).json({
                    message: 'User not found.',
                });
                return;
            }

            const favorites = await Favorites.findAll({
                where: {userId},
                include: [
                    {
                        model: Books,
                    }
                ]
            })
            res.status(200).json({
                user,
                favorites,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    }
}