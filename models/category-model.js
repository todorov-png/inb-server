import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  nameSoftware: { type: String, unique: true, required: true },
  nameCRM: { type: String, required: true },
});

export default model('Category', CategorySchema);
