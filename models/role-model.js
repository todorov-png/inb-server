import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  name: { type: String, required: true },
  permissions: {
    adminMenu: { type: Boolean },
    createTeam: { type: Boolean },
    createRole: { type: Boolean },
    roleAssignment: { type: Boolean },
  },
});

export default model('Role', RoleSchema);
