import express from 'express';
const router = express.Router();
import { query, validationResult } from 'express-validator';

import auth from '../../middleware/auth.js';
import User from '../../model/user.js';
import Job from '../../model/job.js';

/**
 * @route  GET api/job
 * @desc   all jobs with filter
 * @access Private
 */
router.get(
    '/',
    [
        auth,
        query('pageSize', 'Page size should be > 0').isInt({ gt: 0 }),
        query('offset', 'Offset should be numeric').isInt(),
    ],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { pageSize, offset } = req.query as any;

        try {
            pageSize = isNaN(pageSize) ? 10 : parseInt(pageSize, 10);
            offset = isNaN(offset) ? 0 : parseInt(offset, 10);

            const start = pageSize * offset;

            const allJobs = await Job.find().skip(start).limit(pageSize);

            res.json({ jobs: allJobs, hasNext: true });
        } catch (error: any) {
            console.error(error.message);
            res.status(500).send({
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

/**
 * @route  POST api/job
 * @desc   post a new job
 * @access Private
 */
router.post(
    '/add',
    [auth],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById((req as any).user.id).select(
                '-password'
            );

            if (user?.userDetails.type !== 'RECRUITER') {
                return res.status(400).json({
                    error: 'Action not allowed!',
                });
            }

            const newJob = req.body;

            if (newJob.description.length > 16000) {
                return res.status(400).json({
                    error: `Description length should be <= 16000 characters. It's ${newJob.description.length} characters`,
                });
            }

            if (newJob.requirement.length > 16000) {
                return res.status(400).json({
                    error: `Requirement length should be <= 16000 characters. It's ${newJob.requirement.length} characters`,
                });
            }

            delete newJob.createdBy;
            newJob.createdBy = user.id;

            const newJobDoc = new Job(newJob);
            const savedJob = await newJobDoc.save();

            res.json(savedJob);
        } catch (error: any) {
            console.error(error.message);
            res.status(500).json({
                message: 'Server error',
                error: error.message,
            });
        }
    }
);

export default router;
