import { Router } from 'express';

import {
  getPublishedPosts,
  getPosts,
  getPost,
  postPosts,
  postDeletePost,
  patchPublishPost,
  putUpdatePost,
} from '../controllers/postController.js';

import { isAuth } from '../middlewares/isAuth.js';
import { checkPostOwnership } from '../middlewares/checkPostOwnership.js';

import {
  postIdValidatorRules,
  validatePostId,
} from '../validators/postIdValidator.js';

import {
  patchPublishPostBodyValidationRules,
  validatePatchPublish,
} from '../validators/patchPublishPostBodyValidator.js';

import {
  postBodyValidator,
  validatePostBody,
} from '../validators/postBodyValidator.js';

import { validateUpload } from '../middlewares/validateUpload.js';

import { upload } from '../config/multer.js';

const postRouter = Router();

postRouter.get('/', getPublishedPosts);
postRouter.get('/all', isAuth, getPosts);

postRouter.get('/:id', postIdValidatorRules, validatePostId, getPost);

postRouter.post(
  '/',
  isAuth,
  upload.single('image'),
  validateUpload,
  postBodyValidator,
  validatePostBody,
  postPosts
);

postRouter.put(
  '/:id',
  isAuth,
  upload.single('image'),
  validateUpload,
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
  postIdValidatorRules,
  validatePostId,
  checkPostOwnership,
  postDeletePost
);

postRouter.patch(
  '/:id',
  isAuth,
  postIdValidatorRules,
  validatePostId,
  patchPublishPostBodyValidationRules,
  validatePatchPublish,
  checkPostOwnership,
  patchPublishPost
);

export { postRouter };
