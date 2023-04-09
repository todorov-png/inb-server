import { Schema, model } from 'mongoose';

const TeamSchema = new Schema({
  name: { type: String, required: true },
  bearer: { type: String, required: true },
  linkTg: { type: String },
});

export default model('Team', TeamSchema);
