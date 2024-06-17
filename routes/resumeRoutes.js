import express from 'express';
import { uploadResume, getResult } from '../controllers/resumeController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/upload', (req, res) => {
  res.render('upload');
});

router.post('/upload', uploadResume);

router.get('/result', getResult);

export default router;
