import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  phoneNumber: Number,
  googleID: String,
  facebookID: String
});

model('users', userSchema);
