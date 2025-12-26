import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    name: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
    try{
        // token from headers
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // To Remove Bearer Token

        if(!token){
            res.status(401).json({error:'Access token reqired'});
            return;
        }

        // Verify token
        jwt.verify(token,process.env.JWT_SECRET!,(err,decoded)=>{
            if(err){
                res.status(403).json({error:'Invalid or expired token'});
                return;
            }
            req.user = decoded as {userId:string; email:string; name:string};
            next();
        })

    }catch{
        res.status(500).json({ error: 'Internal server error' });
    }
};
