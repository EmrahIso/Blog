import { Router } from 'express';

import {
  getMe,
  postLogin,
  postRegister,
} from '../controllers/authController.js';

import { isAuth } from '../middlewares/isAuth.js';

import {
  loginValidationRules,
  validateLogin,
} from '../validators/loginBodyValidator.js';

import {
  registerValidationRules,
  validateRegister,
} from '../validators/registerBodyValidator.js';

const authRouter = Router();

authRouter.get('/me', isAuth, getMe);
authRouter.post(
  '/register',
  registerValidationRules,
  validateRegister,
  postRegister
);
authRouter.post('/login', loginValidationRules, validateLogin, postLogin);

export { authRouter };
