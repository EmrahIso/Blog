import { uploadToSupabase } from '../services/supabaseService.js';

const postUploadFile = async (req, res) => {
  try {
    const imageURL = await uploadToSupabase(req.file);

    return res.status(200).json({
      imageURL,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Upload failed',
      error: error.message,
    });
  }
};

export { postUploadFile };
