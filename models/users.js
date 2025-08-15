import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // <- antes era true
  googleId: { type: String } // armazena o id do Google
}, { timestamps: true });

export default mongoose.model('User', userSchema);
