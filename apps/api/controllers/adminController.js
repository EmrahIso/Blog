import { getAllAdminPosts } from '../services/adminService.js';

const getAdminPosts = async (req, res, next) => {
  try {
    const posts = await getAllAdminPosts();

    return res.json({ posts });
  } catch (error) {
    next(error);
  }
};

export { getAdminPosts };
