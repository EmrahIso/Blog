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

export { getUser, getUserByUsername };
