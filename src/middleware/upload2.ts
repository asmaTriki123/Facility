// multer-config.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destPath = path.join(__dirname, '../../public/uploads/documents');
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    // On garde seulement la partie après le dernier '-'
    const finalName = uniqueSuffix.split('-').pop() + '.pdf';
    cb(null, finalName);
  }
});

export const uploadContract = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers PDF sont acceptés'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
}).single('rentAgreement');