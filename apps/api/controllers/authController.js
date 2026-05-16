import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import 'dotenv/config';

import { getUser, getUserByUsername } from '../services/userService.js';

const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const me = await getUser({ id: userId });

    return res.json({ me });
  } catch (error) {
    next(error);
  }
};

const postLogin = async (req, res, next) => {
  try {
    const { password, username } = req.body;

    const user = await getUserByUsername({ username });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: 'Invalid credentials' });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

export { getMe, postLogin };
