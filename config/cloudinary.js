import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) return next();

  const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'your-folder' },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(req.file.buffer);
    req.file.cloudinary = result;
    next();
  } catch (err) {
    next(err);
  }
};

export default upload;
