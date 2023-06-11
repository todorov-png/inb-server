import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  nameRU: { type: String, unique: true, required: true },
  nameEN: { type: String, required: true },
});

export default model('Category', CategorySchema);
