import dotenv from "dotenv";
import cryptoJS from "crypto-js";

dotenv.config();

const checkToken = (req, res, next) => {
    const token = req.headers['x-token'];

    if (!token) {
        res.status(401).json({
            message: 'No token provided!'
        });
        return;
    }

    try {
        const decrypt = cryptoJS.AES.decrypt(token, process.env.SECRET);
        const result = JSON.parse(decrypt.toString(cryptoJS.enc.Utf8));

        if(result && result.email) {
            next()
        }else {
            res.status(401).json({
                message: 'Invalid token!'
            })
            return;
        }
    } catch (error) {
        console.log('Token decrypt error:', error);
        res.status(401).json({
            message: 'Invalid token!'
        })
    }
};

export default checkToken;