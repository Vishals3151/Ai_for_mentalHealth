import Goal from '../models/Goal.js';

export const createGoal = async (req, res, next) => {
  try {
    const goal = await Goal.create({ ...req.body, user: req.user._id });
    res.status(201).json(goal);
  } catch (err) { next(err); }
};

export const updateProgress = async (req, res, next) => {
  try {
    const { progress } = req.body;
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $inc: { progress }, completed: progress >= goal.targetCount },
      { new: true }
    );
    res.json(goal);
  } catch (err) { next(err); }
};
