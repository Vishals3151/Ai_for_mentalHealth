import MoodEntry from '../models/MoodEntry.js';

export const generateRecommendations = async userId => {
  /* Basic rule engine; plug in ML here */
  const negativeStreak = await MoodEntry.countDocuments({
    user: userId, emotion: 'negative',
    createdAt: { $gte: new Date(Date.now() - 3*24*60*60*1000) }
  });
  if (negativeStreak >= 3)
    return ['Try a 10-minute mindfulness session', 'Reach out to a friend today'];
  return ['Keep tracking your moods, great job!'];
};
