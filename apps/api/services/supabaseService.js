import sharp from 'sharp';

import { supabase } from '../config/supabase.js';
import { fileTypeFromBuffer } from 'file-type';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export const uploadToSupabase = async (file) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large.');
  }

  const type = await fileTypeFromBuffer(file.buffer);

  if (!type || !allowedMimeTypes.includes(file.mimetype)) {
    throw new Error('Invalid file content.');
  }

  const optimizedBuffer = await sharp(file.buffer)
    .resize({ width: 1400 })
    .webp({ quality: 80 })
    .toBuffer();

  const fileName = `posts/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.webp`;

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, optimizedBuffer, {
      contentType: 'image/webp',
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};
