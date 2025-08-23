import mongoose from 'mongoose';
import bcrypt   from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true, minlength: 6 },
  goals:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }]
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.matchPassword = function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

export default mongoose.model('User', userSchema);
