import express from 'express';
import { createGoal, updateProgress } from '../controllers/goalController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.post('/',     protect, createGoal);
router.patch('/:id', protect, updateProgress);

export default router;
