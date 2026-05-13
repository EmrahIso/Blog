import { Router } from 'express';

import { getMe, postLogin } from '../controllers/authController.js';

import { isAuth } from '../middlewares/isAuth.js';

import {
  loginValidationRules,
  validateLogin,
} from '../validators/loginBodyValidator.js';

const authRouter = Router();

authRouter.get('/me', isAuth, getMe);
authRouter.post('/login', loginValidationRules, validateLogin, postLogin);

export { authRouter };
