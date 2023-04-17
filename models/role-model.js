import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  name: { type: String, required: true },
  permissions: {
    createTeam: { type: Boolean },
    assignTeam: { type: Boolean },
    createRole: { type: Boolean },
    assignRole: { type: Boolean },
  },
});

export default model('Role', RoleSchema);
