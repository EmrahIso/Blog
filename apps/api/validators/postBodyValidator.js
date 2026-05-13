import { body, validationResult } from 'express-validator';

const postBodyValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ min: 2, max: 20 })
    .withMessage('Title must be between 2 and 20 characters long.')
    .matches(/^[^<>:"/\\|?*]+$/)
    .withMessage('Invalid characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required.')
    .isLength({ min: 5, max: 200 })
    .withMessage('Description must be between 5 and 200 characters long.')
    .matches(/^[^<>:"/\\|?*]+$/)
    .withMessage('Invalid characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required.')
    .isLength({ min: 20, max: 10000 })
    .withMessage('Content must be between 20 and 10000 characters long.'),
];

function validatePostBody(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  next();
}

export { postBodyValidator, validatePostBody };
