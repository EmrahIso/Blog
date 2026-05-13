import jwt from 'jsonwebtoken';
import { getUser } from '../services/userService.js';

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Not authorized!' });
  }

  try {
    const bearerToken = authHeader.split(' ')[1];
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

    const user = await getUser({ id: decoded.id });

    if (!user) {
      return res.status(401).json({ msg: 'User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token invalid' });
  }
};

export { isAuth };
