import MoodEntry from '../models/MoodEntry.js';
import { classifyEmotion } from '../services/emotionAnalysisService.js';

export const addMood = async (req, res, next) => {
  try {
    const { text, tasks = [] } = req.body;
    const { emotion, confidence } = await classifyEmotion(text);
    const entry = await MoodEntry.create({
      user: req.user._id, text, tasks, emotion, confidence
    });
    res.status(201).json(entry);
  } catch (err) { next(err); }
};

export const getDailyMoods = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);
    const moods = await MoodEntry.find({ user: req.user._id, createdAt: { $gte: today } })
                                 .sort({ createdAt: -1 });
    res.json(moods);
  } catch (err) { next(err); }
};
