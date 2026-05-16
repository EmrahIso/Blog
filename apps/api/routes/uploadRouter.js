import { Router } from 'express';

import { upload } from '../config/multer.js';

import { validateUpload } from '../middlewares/validateUpload.js';

import { postUploadFile } from '../controllers/uploadController.js';

const uploadRouter = Router();

uploadRouter.post('/', upload.single('image'), validateUpload, postUploadFile);

export { uploadRouter };
