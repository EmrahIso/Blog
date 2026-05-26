import {
  getAllPosts,
  getAllPublishedPosts,
  getOneUnpublishedPost,
  addPost,
  deletePost,
  updatePost,
  updatePublishPost,
} from '../services/postService.js';

import { uploadToSupabase } from '../services/supabaseService.js';

import { getUser } from '../services/userService.js';

const getPublishedPosts = async (req, res, next) => {
  try {
    const posts = await getAllPublishedPosts();

    return res.json({ posts });
  } catch (error) {
    next(error);
  }
};

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
    const post = await getOneUnpublishedPost({ id: postId });

    if (!post) {
      return res.status(401).json({ msg: 'Post not found' });
    }

    if (!post.published) {
      return res.status(401).json({ msg: 'Post is not published!' });
    }

    return res.json({ post });
  } catch (error) {
    next(error);
  }
};

const postPosts = async (req, res, next) => {
  try {
    const { title, description, content } = req.body;
    const userId = req.user.id;

    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadToSupabase(req.file);
    }

    const user = await getUser({ id: userId });

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    const post = await addPost({
      title,
      description,
      content,
      userId,
      imageUrl,
    });

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

    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadToSupabase(req.file);
    }

    const post = await updatePost({
      id: postId,
      title,
      description,
      content,
      imageUrl,
    });

    return res.json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

const patchPublishPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { published } = req.body;

    const post = await getOneUnpublishedPost({ id: postId });

    if (!post) {
      return res.status(401).json({ msg: 'Post not found' });
    }

    const newPost = await updatePublishPost({
      id: postId,
      publishValue: published,
    });

    return res.json({ success: true, newPost });
  } catch (error) {
    next(error);
  }
};

export {
  getPosts,
  getPublishedPosts,
  getPost,
  postPosts,
  postDeletePost,
  putUpdatePost,
  patchPublishPost,
};
