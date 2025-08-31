import express from 'express';
import { updateRoleToEducator, addCourse } from '../controllers/educatorController.js';
import multer from 'multer';

const educatorRouter = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Add Educator Role route handler
educatorRouter.get('/update-role', updateRoleToEducator);

// Add Course route handler
educatorRouter.post('/add-course', upload.single('thumbnail'), addCourse);

export default educatorRouter;