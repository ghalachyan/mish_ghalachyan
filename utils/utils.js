import md5 from 'md5';
import jwt from 'jsonwebtoken';

const {USER_PASSWORD_SECRET, JWT_SECRET} = process.env;

export default {
    hashPassword: (password) => {
        return md5(md5(password)+ USER_PASSWORD_SECRET);
    },

    createToken: (payload, options) => {
        return jwt.sign(payload, JWT_SECRET, options);
    },
}