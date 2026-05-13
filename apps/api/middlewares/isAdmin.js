import { getUser } from '../services/userService';

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await getUser({ id: userId });

    if (!user) return res.status(401).json({ msg: 'Unauthorized.' });

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { isAdmin };
