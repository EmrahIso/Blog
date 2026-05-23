import { getOneUnpublishedPost } from '../services/postService.js';

const checkPostOwnership = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await getOneUnpublishedPost({ id: postId });

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { checkPostOwnership };
