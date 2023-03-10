import express, { Request, Response } from 'express';
// @ts-ignore: no-default-export
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, param, validationResult } from 'express-validator';

import User from '../../model/user.js';
import Job from '../../model/job.js';
import auth from '../../middleware/auth.js';
import { USER_TYPE } from '../../types/common-types.js'; // Todo: check we weren't able to use shortcut

const router = express.Router();

/**
 * @route  POST api/user
 * @desc   Register user
 * @access Public
 */
router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
      max: 45
    })
    // TODO body('userDetails', 'Please include a valid user details'),
  ],
  async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { name, email, password, userDetails } = req.body;

    try {
      let userDoc = await User.findOne({ email });

      // check if email already exists
      if (userDoc) {
        return res.status(400).json({
          error: 'User already exists.'
        });
      }

      // get user's gravatar
      const user = new User({
        name,
        email,
        password,
        userDetails
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jwt
      const payload = {
        user: {
          id: user.id,
          type: user.userDetails.type
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET ?? '',
        {
          expiresIn: '3d'
        },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json(token);
        }
      );
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
 * @route  PUT api/user/update
 * @desc   Edit user profile
 * @access Private
 */
router.put(
  '/update',
  [
    auth,
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail()
    // TODO body('userDetails', 'Please include a valid user details'),
  ],
  async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      if (req.body.password) {
        if (req.body.password.length < 6) {
          return res.status(400).json({
            errors: 'Please enter a password with 6 or more characters'
          });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(
        (req as any).user.id,
        req.body
      );

      res.status(200).json(updatedUser);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({
        message: 'Server error.',
        error: error.message
      });
    }
  }
);

/**
 * @route  PUT api/user/apply
 * @desc   Apply
 * @access Private
 */
router.put(
  '/apply/:jobId',
  [auth, param('jobId', 'Job ID required').isLength({ min: 1 })],
  async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      if ((req as any).user.type !== USER_TYPE.CANDIDATE) {
        return res.status(400).json({
          error: 'Denied!'
        });
      }

      const job = await Job.findById(req.params.jobId);

      if (!job) {
        return res.status(400).json({
          error: 'Job not found.'
        });
      }

      const user = await User.findById((req as any).user.id);

      const alreadyAnApplicant = job.applicants.some(
        (applicant) => applicant === (req as any).user.id
      );
      const alreadyAppliedJob = user!.userDetails.appliedTo!.some(
        (jobId) => jobId === req.params.jobId
      );

      if (alreadyAnApplicant || alreadyAppliedJob) {
        return res.status(400).json({
          error: 'Already applied.'
        });
      }

      job.applicants.push((req as any).user.id);
      user!.userDetails.appliedTo!.unshift(req.params.jobId);

      await job.save();
      await user!.save();

      res.status(200).json(user!.userDetails.appliedTo);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({
        message: 'Server error.',
        error: error.message
      });
    }
  }
);

/**
 * @route  Get api/user/all
 * @desc   Get all user profile
 * @access Private
 */
router.post('/all', [auth], async (req: Request, res: Response) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        error: 'Bad request.'
      });
    }

    if ((req as any).user.type !== USER_TYPE.RECRUITER) {
      return res.status(400).json({
        error: 'Denied!'
      });
    }

    const user = await User.where('_id')
      .in(req.body)
      .select('-password -userDetails.appliedTo');

    res.json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error.',
      error: error.message
    });
  }
});

export default router;
