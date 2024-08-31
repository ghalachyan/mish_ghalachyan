import Users from "../models/Users.js";
import utils from "../utils/utils.js";

export default {
    async registration(req, res) {
        try {
            const {
                userName,
                email,
                password,
            } = req.body

            const [param1, param2] = await Users.findOrCreate({
                where: {email: email.toLowerCase()},
                defaults: {
                    userName,
                    email: email.toLowerCase(),
                    password: utils.hashPassword(password),
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

            const hasPassword = utils.hashPassword(password);

            if (!user || hasPassword !== user.password) {
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

            res.status(200).json({
                message: 'Login successfully',
                token,
            });

        } catch (e) {
            res.status(500).json({
                message: 'Internal server error',
                error: e.message,
            });
        }
    },
}