import { param, validationResult } from 'express-validator';

const postIdValidatorRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Post Id is required.')
    .isUUID()
    .withMessage('Post Id is invalid!'),
];

function validatePostId(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  next();
}

export { postIdValidatorRules, validatePostId };
