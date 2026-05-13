import { prisma } from '../lib/prisma.js';

const getAllAdminPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });

  return posts;
};

export { getAllAdminPosts };
