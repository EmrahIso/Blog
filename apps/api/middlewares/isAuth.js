import jwt from 'jsonwebtoken';
import { getUser } from '../services/userService.js';

import 'dotenv/config';

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Not authorized!' });
    }

    const bearerToken = authHeader.split(' ')[1];
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

    const user = await getUser({ id: decoded.userId });

    if (!user) {
      return res.status(401).json({ msg: 'User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};

export { isAuth };
