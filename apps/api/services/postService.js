import { prisma } from '../lib/prisma.js';

const getAllPublishedPosts = async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return posts;
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });

  return posts;
};

const getOneUnpublishedPost = async ({ id }) => {
  if (!id) throw new Error('postId is required!');

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) throw new Error('There is no post with this postId!');

  return post;
};

const addPost = async ({ title, description, content, userId, imageUrl }) => {
  if (!userId) throw new Error('userId is required!');
  if (!title) throw new Error('title is required!');
  if (!description) throw new Error('description is required!');
  if (!content) throw new Error('content is required!');

  const post = await prisma.post.create({
    data: {
      userId,
      title,
      description,
      content,
      imageUrl,
    },
  });

  return post;
};

const deletePost = async ({ id }) => {
  if (!id) throw new Error('postId is required!');

  const post = await prisma.post.delete({
    where: {
      id,
    },
  });

  return post;
};

const updatePost = async ({ id, title, description, content, imageUrl }) => {
  if (!id) throw new Error('postId is required!');
  if (!title) throw new Error('title is required!');
  if (!description) throw new Error('description is required!');
  if (!content) throw new Error('content is required!');

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      content,
      imageUrl,
    },
  });

  return post;
};

const updatePublishPost = async ({ id, publishValue }) => {
  if (!id) throw new Error('postId is required!');

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      published: publishValue,
    },
  });

  return post;
};

export {
  getAllPosts,
  getAllPublishedPosts,
  addPost,
  deletePost,
  updatePost,
  updatePublishPost,
  getOneUnpublishedPost,
};
