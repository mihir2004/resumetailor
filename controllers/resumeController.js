import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: path.join(__dirname, '../public/uploads') });

export const uploadResume = (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err) {
      return res.status(500).send('Error uploading file.');
    }

    const resumePath = req.file.path;

    try {
      const response = await axios.post('http://localhost:5000/process_resume', { resumePath });

      const { tailoredResume, recommendations } = response.data;

      res.render('result', { tailoredResume, recommendations });
    } catch (error) {
      res.status(500).send('Error processing resume.');
    }
  });
};

export const getResult = (req, res) => {
  res.render('result');
};
