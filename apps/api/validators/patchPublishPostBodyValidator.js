import { body, validationResult } from 'express-validator';

const patchPublishPostBodyValidationRules = [
  body('published')
    .exists()
    .withMessage('published field is required')
    .isBoolean()
    .withMessage('published must be a boolean'),
];

function validatePatchPublish(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  next();
}

export { patchPublishPostBodyValidationRules, validatePatchPublish };
