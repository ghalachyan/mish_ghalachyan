import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env; 

export default async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }

    try{
        const deryptedData = jwt.verify(token, JWT_SECRET);
        req.user = deryptedData;

        next();
    }catch(e) {
        console.log(e.message);
        res.status(401).json({message: e.message});
    }
}