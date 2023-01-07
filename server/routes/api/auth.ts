import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

import auth from '../../middleware/auth.js';
import User from '../../model/user.js';

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById((req as any).user.id).select(
            '-password'
        );
        res.json(user);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export default router;
