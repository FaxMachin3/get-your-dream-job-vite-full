import { verify } from 'jsonwebtoken';
import config from 'config';
import { NextFunction, Request, Response } from 'express';

// @route  GET api/auth
// @desc   Test route
// @access Public
export default function (req: Request, res: Response, next: NextFunction) {
    // get the token from the header
    const token = req.header('x-auth-token');

    // check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // verify token
    try {
        const decoded = verify(token, config.get('jwtSecret'));

        (req as any).user = (decoded as any).user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
