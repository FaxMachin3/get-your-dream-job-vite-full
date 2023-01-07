import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import config from 'config';

import User from '../../model/user.js';

const router = express.Router();

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async (req: Request, res: Response) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            // check if email already exists
            if (user) {
                return res.status(400).json({
                    error: [
                        {
                            msg: 'User alreadly exists',
                        },
                    ],
                });
            }

            // get user's gravatar

            user = new User({
                name,
                email,
                password,
            });

            // encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // return jwt
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000,
                },
                (error, token) => {
                    if (error) {
                        throw error;
                    }
                    res.json({ token });
                }
            );
        } catch (error: any) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

export default router;
