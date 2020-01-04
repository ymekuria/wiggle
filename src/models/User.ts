import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  phoneNumber: {
    type: Number,
    unique: true,
    required: true
  },
  googleID: String,
  facebookID: String
});

model('User', userSchema);
