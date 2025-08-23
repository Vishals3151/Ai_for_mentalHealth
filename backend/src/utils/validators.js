import Joi from 'joi';

export const moodValidator = Joi.object({
  text:  Joi.string().min(1).required(),
  tasks: Joi.array().items(Joi.string()).optional()
});
