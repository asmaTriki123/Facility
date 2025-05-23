import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, path.join(__dirname, '../../public/uploads')); // Dossier où les images seront stockées
  },
  filename: (req:any, file:any, cb:any) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nom du fichier
  },
});




export const upload = multer({ storage });

// middleware/upload.ts
/*import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ 
  storage,
 fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers PDF sont autorisés'));
    }
  }
});*/
