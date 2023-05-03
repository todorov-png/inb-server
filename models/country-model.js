import { Schema, model } from 'mongoose';

const CountrySchema = new Schema({
  name: { type: String, unique: true, required: true },
  currency: { type: String, required: true },
  lang: { type: String, required: true },
  callCenterSchedule: { type: String, required: true },
});

export default model('Country', CountrySchema);
