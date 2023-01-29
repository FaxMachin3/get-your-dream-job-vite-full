import express from 'express';
const router = express.Router();
import { body, query, validationResult } from 'express-validator';

import auth from '../../middleware/auth.js';
import User from '../../model/user.js';
import Job from '../../model/job.js';
import { IJob, USER_TYPE } from '../../types/common-types.js';

/**
 * @route  POST api/job
 * @desc   all jobs with filter
 * @access Private
 */
router.post(
  '/',
  [
    auth,
    body('tags', 'Should be array of strings').isArray(),
    body('minSalary', 'Should be a string').isString(),
    query('pageSize', 'Page size should be > 0').isInt({ gt: 0 }),
    query('offset', 'Offset should be numeric').isInt()
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { pageSize, offset } = req.query as any;
    let { tags, minSalary } = req.body;

    try {
      const user = await User.findById((req as any).user.id).select(
        '-password'
      );

      const isRecruiter = user?.userDetails.type === USER_TYPE.RECRUITER;
      pageSize = isNaN(pageSize) ? 150 : parseInt(pageSize, 10);
      offset = isNaN(offset) ? 0 : parseInt(offset, 10);

      const start = pageSize * offset;

      let searchConfig = {};
      let commonSearchConfig: any = {};
      let selectConfig = '';

      if (isRecruiter) {
        searchConfig = {
          createdBy: (req as any).user.id
        };
      } else {
        searchConfig = {
          applicants: { $nin: (req as any).user.id }
        };
        selectConfig = '-applicants';
      }

      minSalary = parseInt(minSalary);
      if (!Number.isNaN(minSalary)) {
        commonSearchConfig['salaryRange.max'] = { $gte: minSalary };
      }

      if (tags.length > 0) {
        commonSearchConfig['tags'] = { $in: tags };
      }

      const allJobs = await Job.find({
        ...searchConfig,
        ...commonSearchConfig
      })
        .sort({ createdAt: 'desc' }) // Todo: add caching | find a way to keep the new data at the top
        .select(selectConfig)
        .skip(start)
        .limit(pageSize);

      res.json({ jobs: allJobs, hasNext: true });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send({
        message: 'Server error.',
        error: error.message
      });
    }
  }
);

/**
 * @route  GET api/job/applied
 * @desc   applied jobs with filter
 * @access Private
 */
router.get(
  '/applied',
  [
    auth,
    query('pageSize', 'Page size should be > 0').isInt({ gt: 0 }),
    query('offset', 'Offset should be numeric').isInt()
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { pageSize, offset } = req.query as any;

    try {
      const user = await User.findById((req as any).user.id).select(
        '-password'
      );

      if (user!.userDetails.type === USER_TYPE.RECRUITER) {
        return res.status(400).json({
          error: 'Action not allowed!'
        });
      }
      pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize, 10);
      offset = isNaN(offset) ? 0 : parseInt(offset, 10);

      const start = pageSize * offset;

      const allJobs = await Job.find({
        _id: { $in: user!.userDetails.appliedTo }
      })
        .select('-applicants')
        .skip(start)
        .limit(pageSize);

      res.json({ jobs: allJobs, hasNext: true });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send({
        message: 'Server error.',
        error: error.message
      });
    }
  }
);

/**
 * @route  POST api/job/add
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

      if (user?.userDetails.type !== USER_TYPE.RECRUITER) {
        return res.status(400).json({
          error: 'Action not allowed!'
        });
      }

      const newJob = req.body;

      if (newJob.description.length > 16000) {
        return res.status(400).json({
          error: `Description length should be <= 16000 characters. It's ${newJob.description.length} characters`
        });
      }

      if (newJob.requirement.length > 16000) {
        return res.status(400).json({
          error: `Requirement length should be <= 16000 characters. It's ${newJob.requirement.length} characters`
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
        message: 'Server error.',
        error: error.message
      });
    }
  }
);

export default router;
