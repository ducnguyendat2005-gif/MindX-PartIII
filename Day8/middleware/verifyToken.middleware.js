import jwt from 'jsonwebtoken'
import { retakeToken } from './retakeToken.middleware.js'
export const verifyToken = (req, res, next) => {
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new Error("Không có token");
        const token = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
        req.user = decoded;
        // xem decoded trông như nào
        next();
        
}
    catch(error){
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token không hợp lệ!', code: 'TOKEN_INVALID' });
        }
        if (error.name === 'TokenExpiredError') {
            const RTheader =req.headers.rtauthorization;
            if (!RTheader){
                return res.status(401).json({ 
                    message: 'AT hết hạn! Vui lòng gửi RT vào header rtauthorization', 
                    code: 'TOKEN_EXPIRED' 
                });
            }
            return retakeToken(req,res,next);        
        }
        next(error)
    }
}