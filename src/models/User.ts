import { Schema } from 'mongoose';

const userSchema = new Schema({
  phoneNumber: Number,
  googleID: String,
  facebookID: String
});
