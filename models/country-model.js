import { Schema, model } from 'mongoose';

const CountrySchema = new Schema({
  name: { type: String, unique: true, required: true },
  lang: { type: String, required: true },
  callCenterSchedule: { type: String },
});

export default model('Country', CountrySchema);
