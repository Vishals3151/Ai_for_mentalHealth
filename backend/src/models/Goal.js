import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  targetCount: { type: Number, default: 1 },
  progress:    { type: Number, default: 0 },
  unit:        { type: String, enum: ['sessions','minutes','steps'], default: 'sessions' },
  dueDate:     Date,
  completed:   { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Goal', goalSchema);
