import express from 'express';
import { updateRoleToEducator } from '../controllers/educatorController.js';

const educatorRouter = express.Router();

// Add Educator Role route handler
// Ensure the handler supports req, res params and handles errors
educatorRouter.get('/update-role', updateRoleToEducator);

export default educatorRouter;
