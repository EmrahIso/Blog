import { Router } from 'express';

import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

import { getAdminPosts } from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/posts', isAuth, isAdmin, getAdminPosts);

export { adminRouter };
