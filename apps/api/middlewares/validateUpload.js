const validateUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  next();
};

export { validateUpload };
