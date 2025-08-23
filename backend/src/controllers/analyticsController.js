/* Basic analytics controller - you can extend it later */
import MoodEntry from '../models/MoodEntry.js';

/**
 * GET /api/analytics
 * Return simple mood-count stats for the authenticated user.
 */
export const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Example aggregation: how many entries per emotion
    const moodCounts = await MoodEntry.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$emotion', count: { $sum: 1 } } }
    ]);

    res.json({ moodCounts });
  } catch (err) {
    next(err);           // Pass to error-handling middleware
  }
};
