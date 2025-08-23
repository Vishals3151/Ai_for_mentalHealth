import express from 'express';
import { addMood, getDailyMoods } from '../controllers/moodController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.route('/')           //  ←  path is “/”
  .post(protect, addMood)   //  POST /api/moods
  .get(protect, getDailyMoods);   //  GET  /api/moods

export default router;
