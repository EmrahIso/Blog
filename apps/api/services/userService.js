import { prisma } from '../lib/prisma.js';

const getUser = async ({ id }) => {
  if (!id) throw new Error('userId is required!');

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const getUserByUsername = async ({ username }) => {
  if (!username) throw new Error('username is required!');

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};

const isUsernameTaken = async ({ username }) => {
  if (!username) throw new Error('username is required!');

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return !!user;
};

const createUser = async ({ username, password }) => {
  if (!username) throw new Error('username is required!');
  if (!password) throw new Error('password is required!');

  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  return user;
};

export { getUser, getUserByUsername, createUser, isUsernameTaken };
