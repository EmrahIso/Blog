import { Router } from 'express';

import {
  getPosts,
  getPost,
  postPosts,
  postDeletePost,
  patchPublishPost,
} from '../controllers/postController.js';

import { isAuth } from '../middlewares/isAuth.js';
import { checkPostOwnership } from '../middlewares/checkPostOwnership.js';
import { isAdmin } from '../middlewares/isAdmin.js';

import {
  postIdValidatorRules,
  validatePostId,
} from '../validators/postIdValidator.js';

import {
  postBodyValidator,
  validatePostBody,
} from '../validators/postBodyValidator.js';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', postIdValidatorRules, validatePostId, getPost);

postRouter.post(
  '/',
  isAuth,
  isAdmin,
  postBodyValidator,
  validatePostBody,
  postPosts
);

postRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  postIdValidatorRules,
  validatePostId,
  postBodyValidator,
  validatePostBody,
  checkPostOwnership,
  putUpdatePost
);

postRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  postIdValidatorRules,
  validatePostId,
  checkPostOwnership,
  postDeletePost
);

postRouter.patch(
  '/:id',
  isAuth,
  isAdmin,
  postIdValidatorRules,
  validatePostId,
  checkPostOwnership,
  patchPublishPost
);

export { postRouter };
