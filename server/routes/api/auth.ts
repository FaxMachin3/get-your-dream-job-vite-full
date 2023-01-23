import express from "express";
import { check, validationResult } from "express-validator";
// @ts-ignore: no-default-export
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import auth from "../../middleware/auth.js";
import User from "../../model/user.js";
import config from "config";

const router = express.Router();

/**
 * @route  GET api/auth
 * @desc   test auth
 * @access Private
 */
router.get("/", [auth], async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findById((req as any).user.id).select("-password");
    res.json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

/**
 * @route  POST api/auth
 * @desc   Login user and get token
 * @access Public
 */
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req: express.Request, res: express.Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // check if email already exists
      if (!user) {
        return res.status(400).json({
          error: "Invalid credentials.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          error: "Invalid credentials.",
        });
      }

      // return jwt
      const payload = {
        user: {
          id: user.id,
          type: user.userDetails.type,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: "3d",
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
        message: "Server error",
        error: error.message,
      });
    }
  }
);

export default router;
