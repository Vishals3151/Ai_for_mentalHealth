import mongoose from 'mongoose';

const moodEntrySchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emotion:    { type: String, enum: ['positive','negative','neutral'], required: true },
  confidence: { type: Number, min: 0, max: 1, required: true },
  text:       { type: String, required: true },
  tasks:      [String],
  createdAt:  { type: Date, default: Date.now }
});

export default mongoose.model('MoodEntry', moodEntrySchema);
