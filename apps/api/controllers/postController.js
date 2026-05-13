import {
  getAllPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
  updatePublishPost,
} from '../services/postService.js';
import { getUser } from '../services/userService.js';

const getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    return res.json({ posts });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await getPost({ id: postId });

    return res.json({ post });
  } catch (error) {
    next(error);
  }
};

// ADMIN

const postPosts = async (req, res, next) => {
  try {
    const { title, description, content } = req.body;
    const userId = req.user.id;

    const user = await getUser({ id: userId });

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    const post = await addPost({ title, description, content, userId });

    return res.json({ post });
  } catch (error) {
    next(error);
  }
};

const postDeletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const post = await deletePost({ id: postId });

    return res.json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

const putUpdatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, description, content } = req.body;

    const post = await updatePost({ id: postId, title, description, content });

    return res.json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

const patchPublishPost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const post = await getPost({ id: postId });

    if (!post) {
      return res.status(401).json({ msg: 'Post not found' });
    }

    const newPostPublishValue = post.publish === true ? false : true;

    const newPost = await updatePublishPost({
      id: postId,
      publishValue: newPostPublishValue,
    });

    return res.json({ success: true, newPost });
  } catch (error) {
    next(error);
  }
};

export {
  getPosts,
  getPost,
  postPosts,
  postDeletePost,
  putUpdatePost,
  patchPublishPost,
};
