import Categories from "../models/Category.js";
import Users from "../models/Users.js";
import BookCategory from "../models/BookCategory.js";

export default {
    async getCategories(req, res) {
        try {
            const userId = req.user.id;

            const user = await Users.findByPk(userId);

            if (!user) {
                res.status(404).json({
                    message: 'User not found.',
                });
                return;
            }

            const categories = await Categories.findAll();
            res.status(200).json({
                categories: categories,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },

    // async addBookCategory(req, res) {
    //     try {
    //         const userId = req.user.id;
    //
    //         const user = await Users.findByPk(userId);
    //
    //         if (!user) {
    //             res.status(404).json({
    //                 message: 'User not found.',
    //             });
    //             return;
    //         }
    //
    //
    //     }catch (e) {
    //         res.status(500).json({
    //             message: 'Internal server error',
    //             error: e.message,
    //         });
    //     }
    // }
}
