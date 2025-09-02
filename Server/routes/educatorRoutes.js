// filepath: d:\WEB\PROJECT PRIDE\PROJECT\CLIENT\Server\routes\educatorRoutes.js
import express from 'express';
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Educator route working');
});

export default router;