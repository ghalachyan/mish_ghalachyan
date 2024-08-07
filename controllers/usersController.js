import md5 from "md5";
import dotenv from "dotenv"
import cryptoJS from "crypto-js";
import models from "../models/users.js";

dotenv.config()

export default {
    async getUsersList(req, res) {
        try {
            const users = await models.getUsersList()
            
            if (!users) {
                res.status(422).json({
                    users: {},
                });
                return;
            }
            res.status(200).json({
                message: 'Users retrieved successfully',
                users: users
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async getUserProfile(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(422).json({
                    message: 'Missing id!',
                });
                return;
            }

            const result = await models.getUserProfile({ id })

            if (!result.success) {
                res.status(401).json({
                    message: result.message
                });
                return;
            }
            res.status(200).json({
                message: 'User retrieved successfully',
                user: result.rows
            });


        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async registration(req, res) {
        try {
            const {
                fName,
                lName,
                email,
                password
            } = req.body;

            if (!fName || !lName || !email || !password) {
                res.status(422).json({
                    message: 'Missing fName, lName, email or password!',
                });
                return
            }

            const lowerCaseEmail = email.toLowerCase();
            const hashedPassword = md5(password);

            const result = await models.registration({
                fName,
                lName,
                lowerCaseEmail,
                hashedPassword
            });

            if (result) {
                res.status(200).json({
                    message: 'User created',
                    userEmail: lowerCaseEmail
                });
                return
            }
            res.status(401).json({
                message: result
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(422).json({
                    message: 'Missing email or password',
                })
            };

            const secret = process.env.SECRET;
            const hash = cryptoJS.AES.encrypt(JSON.stringify({
                email
            }), secret).toString();
            console.log(hash)

            const lowerCaseEmail = email.toLowerCase()
            const result = await models.login({ lowerCaseEmail, password })

            if (!result.success) {
                res.status(401).json({
                    message: user.message
                });
                return;
            }

            res.setHeader('x-token', hash)
            res.status(200).json({
                message: 'Login successfull',
                user: result.user
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }

    },
    async updateUserProfile(req, res) {
        try {
            const {
                fName,
                lName,
                email,
                password,
                id
            } = req.body;

            if (!id || !fName || !lName || !email || !password) {
                res.status(422).json({
                    message: 'Missing parameters!',
                })
            };

            const hashedPassword = md5(password);
            const lowerCaseEmail = email.toLowerCase()
            const result = await models.updateUserProfile({
                fName,
                lName,
                lowerCaseEmail,
                hashedPassword,
                id
            })

            if (!result.success) {
                res.status(401).json({
                    message: result.message
                });
                return;
            }
            res.status(200).json({
                message: 'Update successfully!',
                id: id
            });
        } catch (error) {
            console.error('Internal Server Error:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async deleteProfile(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(422).json({
                    message: 'Missing parameters!',
                })
                return;
            }

            const result = await models.deleteProfile({ id });
            if (!result.success) {
                res.status(401).json({
                    message: result.message
                });
                return;
            }
            res.status(200).json({
                message: 'User successfully deleted!',
                id
            });

        } catch (error) {
            console.error('Internal Server Error:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
}