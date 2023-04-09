import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  name: { type: String, required: true },
  permissions: {
    adminMenu: { type: Boolean, default: false },
    createTeam: { type: Boolean, default: false },
    createRole: { type: Boolean, default: false },
    roleAssignment: { type: Boolean, default: false },
  },
});

export default model('Role', RoleSchema);
