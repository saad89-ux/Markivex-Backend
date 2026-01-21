import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadDir = "uploads";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;
