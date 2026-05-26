import multer from 'multer';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Only images allowed.'), false);
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
  fileFilter,
});
